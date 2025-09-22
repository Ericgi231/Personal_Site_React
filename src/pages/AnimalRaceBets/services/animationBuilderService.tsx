import { AnimationFrame, CanvasAnimation, GameData, GamePhase, INTERMISSION_MAP, simulateRace, SpriteData, TRACK_MAP, TransformInfo } from "@my-site/shared/animal-race-bets";
import { getAnimalSpritePath, getAnimalWinnerPath, getGoalPath, getIntermissionPath, getTrackBackgroundPath, getTrackLayoutPath, getTrackResultsPath } from "../constants";
import { buildBackgroundSprite, buildSprite } from "./canvasFrameDrawService";

//TODO: replace gameData with a phase specific data structure
// export const phaseFrameGenerators: Record<GamePhase,
//   ((gameData: GameData, ...args: any[]) => AsyncGenerator<SpriteData[]>)
// > = {
//   intermission: (gameData: GameData) => intermissionFrameGenerator(gameData),
//   betting: (gameData: GameData) => bettingFrameGenerator(gameData),
//   race: (gameData: GameData, animalTransforms: TransformInfo[][]) => raceFrameGenerator(gameData, animalTransforms),
//   results: (gameData: GameData) => resultsFrameGenerator(gameData),
//   loading: (gameData: GameData) => loadingFrameGenerator(gameData),
// };

export async function intermissionAnimationBuilder(intermissionId: string, animalIds: string[]): Promise<CanvasAnimation> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getIntermissionPath(intermissionId));
  const animalSprites: SpriteData[] = await Promise.all(
    animalIds.map((id, idx) =>
      buildSprite(getAnimalSpritePath(id), INTERMISSION_MAP[intermissionId]!.animalPositions[idx]!)
    )
  );
  return { frames: [{ sprites: [bgSprite, ...animalSprites] }] };
}

export async function bettingAnimationBuilder(trackId: string, animalIds: string[]): Promise<CanvasAnimation> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(trackId));
  const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(trackId));
  const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[trackId]!.goalPosition);
  const animalSprites: SpriteData[] = await Promise.all(
    animalIds.map((id, idx) =>
      buildSprite(getAnimalSpritePath(id), TRACK_MAP[trackId]!.animalPositions[idx]!)
    )
  );
  return { frames: [{ sprites: [bgSprite, layoutSprite, goalSprite, ...animalSprites] }] };
}

const SIM_STEP_MS = 1000 / 60; // 16.666...ms

export async function raceAnimationBuilder(trackId: string, animalIds: string[], animalTransforms: TransformInfo[][]): Promise<CanvasAnimation> {
  try {
    let frames: AnimationFrame[] = [];

    // Load static sprites
    const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(trackId));
    const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(trackId));
    const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[trackId]!.goalPosition);

    // For each transform array, build a frame
    for (let transform of animalTransforms) {
      const animalSprites: SpriteData[] = await Promise.all(
        transform.map(async (animal, idx) => {
          const sprite = await buildSprite(getAnimalSpritePath(animalIds[idx]!), {
            coordinates: { x: animal.coordinates.x, y: animal.coordinates.y },
            size: { w: 96, h: 96 }
          });
          return sprite;
        })
      );
      frames.push({ sprites: [bgSprite, layoutSprite, goalSprite, ...animalSprites] });
    }
    return { frames };
  } catch (err) {
    console.error('Error in raceFrameGenerator:', err);
    throw err;
  }
}

export async function resultsAnimationBuilder(trackId: string, winnerId: string): Promise<CanvasAnimation> {
  const bgSprite: SpriteData = await buildBackgroundSprite(getTrackResultsPath(trackId));
  const winnerSprite: SpriteData = await buildBackgroundSprite(getAnimalWinnerPath(winnerId || 'rat1'));
  return { frames: [{ sprites: [bgSprite, winnerSprite] }] };
}

export async function loadingAnimationBuilder(): Promise<CanvasAnimation> {
  const bgSprite: SpriteData = await buildBackgroundSprite("/assets/animal-race-bets/loading.png");
  return { frames: [{ sprites: [bgSprite] }] };
}