import { ANIMAL_MAP, GameData, TRACK_MAP } from "@my-site/shared/animal-race-bets";
import { selectRandomKeysFromMap } from "../helper/helper";

/**
 * Updates the game data for the betting phase. 
 * Updates: trackId, animalIds
 * @param gameData The current game data to update for the betting phase.
 */
export async function generateBettingData(gameData: GameData): Promise<GameData> {
  const trackId: string = selectRandomKeysFromMap(TRACK_MAP)[0];
  const animalCount: number = TRACK_MAP[trackId].animalPositions.length;

  const animalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, animalCount);

  return {
    ...gameData,
    trackId,
    animalIds,
  }
}