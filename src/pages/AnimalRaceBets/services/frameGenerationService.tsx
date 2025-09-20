import { AnimalGameData, CollisionMask, GameData, GamePhase, getDatafromImage, INTERMISSION_MAP, SpriteData, step, TRACK_MAP } from "@my-site/shared/animal-race-bets";
import { getAnimalSpritePath, getAnimalWinnerPath, getGoalPath, getIntermissionPath, getTrackBackgroundPath, getTrackLayoutPath, getTrackResultsPath } from "../constants";
import { buildBackgroundSprite, buildSprite } from "./drawingService";

//TODO: replace gameData with a phase specific data structure
export const phaseFrameGenerators: Record<GamePhase, (gameData: GameData) => AsyncGenerator<SpriteData[]>> = {
  intermission: intermissionFrameGenerator,
  betting: bettingFrameGenerator,
  race: raceFrameGenerator,
  results: resultsFrameGenerator,
  loading: loadingFrameGenerator,
};

async function* intermissionFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getIntermissionPath(gameData.intermission.id));
  const animalSprites: SpriteData[] = await Promise.all(
    gameData.intermission.animalIds.map((id, idx) =>
      buildSprite(getAnimalSpritePath(id), INTERMISSION_MAP[gameData.intermission.id]!.animals[idx]!)
    )
  );
  yield [bgSprite, ...animalSprites];
}

async function* bettingFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
  const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
  const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goal);
  const animalSprites: SpriteData[] = await Promise.all(
    gameData.race.animalIds.map((id, idx) =>
      buildSprite(getAnimalSpritePath(id), TRACK_MAP[gameData.race.trackId]!.animals[idx]!)
    )
  );
  yield [bgSprite, layoutSprite, goalSprite, ...animalSprites];
}

const SIM_STEP_MS = 1000 / 60; // 16.666...ms

async function* raceFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  // Load static sprites
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
  const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
  const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goal);

  const layoutData: ImageData = getDatafromImage(layoutSprite.img, layoutSprite.transform.size.w);
  const layoutMask = new CollisionMask(layoutData, 128);

  // Initialize animal states as AnimalGameData
  let animalStates: AnimalGameData[] = await Promise.all(
    TRACK_MAP[gameData.race.trackId]!.animals.map(async (pos, idx) => {
      const sprite = await buildSprite(getAnimalSpritePath(gameData.race.animalIds[idx]!), {
        pos: { x: pos.pos.x, y: pos.pos.y },
        size: { w: 96, h: 96 }
      });
      // Build mask for animal
      const animalData: ImageData = getDatafromImage(sprite.img, sprite.transform.size.w);
      const mask = new CollisionMask(animalData, 5);
      return {
        id: gameData.race.animalIds[idx]!,
        mask,
        pos: { x: pos.pos.x, y: pos.pos.y },
        angle: Math.random() * Math.PI * 2,
        speed: 200 // pixels per second
      };
    })
  );

  let simTime = 0;
  let prevStates = animalStates.map(a => ({ ...a, pos: { ...a.pos } }));
  while (simTime < gameData.phase.durationMs) {
    // Advance simulation by fixed time step using step from race-service
    const positions = step(layoutMask, animalStates);
    // Save previous states for interpolation
    const currStates = animalStates.map((animal, idx) => ({
      ...animal,
      pos: { x: positions[idx]!.x, y: positions[idx]!.y }
    }));
    // Build animal sprites for this frame, including prevPos for interpolation
    const animalSprites: SpriteData[] = await Promise.all(
      currStates.map(async (animal, idx) => {
        const sprite = await buildSprite(getAnimalSpritePath(animal.id), {
          pos: { x: animal.pos.x, y: animal.pos.y },
          size: { w: 96, h: 96 }
        });
        // Attach prevPos for interpolation
        (sprite as any).prevPos = prevStates[idx] ? { x: prevStates[idx].pos.x, y: prevStates[idx].pos.y } : { x: animal.pos.x, y: animal.pos.y };
        return sprite;
      })
    );
    // Yield the frame
    yield [bgSprite, layoutSprite, ...animalSprites, goalSprite];
    // Prepare for next step
    animalStates = currStates;
    prevStates = currStates.map(a => ({ ...a, pos: { ...a.pos } }));
    simTime += SIM_STEP_MS;
  }
}

async function* resultsFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackResultsPath(gameData.race.trackId));
  const winnerSprite: SpriteData = await buildBackgroundSprite(getAnimalWinnerPath(gameData.race.winnerId || 'rat1'));
  yield [bgSprite, winnerSprite];
}

async function* loadingFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  return []
}