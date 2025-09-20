import { GameData, GamePhase, INTERMISSION_MAP, SpriteData, simulateRace, TRACK_MAP } from "@my-site/shared/animal-race-bets";
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
      buildSprite(getAnimalSpritePath(id), INTERMISSION_MAP[gameData.intermission.id]!.animalPositions[idx]!)
    )
  );
  yield [bgSprite, ...animalSprites];
}

async function* bettingFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
  const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
  const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goalPosition);
  const animalSprites: SpriteData[] = await Promise.all(
    gameData.race.animalIds.map((id, idx) =>
      buildSprite(getAnimalSpritePath(id), TRACK_MAP[gameData.race.trackId]!.animalPositions[idx]!)
    )
  );
  yield [bgSprite, layoutSprite, goalSprite, ...animalSprites];
}

const SIM_STEP_MS = 1000 / 60; // 16.666...ms

async function* raceFrameGenerator(gameData: GameData): AsyncGenerator<SpriteData[]> {
  try {
    // Load static sprites
    const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
    const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
    const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goalPosition);

    // Load track mask from mask.json
    const trackMaskUrl = `/assets/animal-race-bets/tracks/${gameData.race.trackId}/mask.json`;
    const trackMaskRes = await fetch(trackMaskUrl);
    if (!trackMaskRes.ok) throw new Error(`Failed to fetch track mask: ${trackMaskUrl}`);
    const trackMaskJson = await trackMaskRes.json();

    // Load animal masks from mask.json
    const animalMaskJsons = await Promise.all(
      gameData.race.animalIds.map(async (animalId) => {
        const maskUrl = `/assets/animal-race-bets/animals/${animalId}/mask.json`;
        const maskRes = await fetch(maskUrl);
        if (!maskRes.ok) throw new Error(`Failed to fetch animal mask: ${maskUrl}`);
        const maskJson = await maskRes.json();
        return { id: animalId, ...maskJson };
      })
    );

    // Call simulateRace to get precomputed frames
    const { winnerIndex, durationMs, frames} = simulateRace(trackMaskJson, animalMaskJsons, gameData.race.raceSeed);

    // For each frame, yield SpriteData[]
    for (let frame of frames) {
      const animalSprites: SpriteData[] = await Promise.all(
        frame.map(async (animal, idx) => {
          const sprite = await buildSprite(getAnimalSpritePath(gameData.race.animalIds[idx]!), {
            coordinates: { x: animal.coordinates.x, y: animal.coordinates.y },
            size: { w: 96, h: 96 }
          });
          return sprite;
        })
      );
      yield [bgSprite, layoutSprite, ...animalSprites, goalSprite];
    }
  } catch (err) {
    console.error('Error in raceFrameGenerator:', err);
    throw err;
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