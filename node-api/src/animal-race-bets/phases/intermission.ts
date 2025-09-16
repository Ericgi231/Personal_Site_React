import { ANIMAL_MAP, GameData, INTERMISSION_MAP } from "@my-site/shared/animal-race-bets";
import { selectRandomKeysFromMap } from "../helper/helper";

/**
 * Updates the game data for the intermission phase. 
 * Updates: intermissionId, intermissionAnimalIds, bets
 * @param gameData The current game data to update for the intermission phase.
 */
export async function generateIntermissionData(gameData: GameData): Promise<GameData> {
  const intermissionId: string = selectRandomKeysFromMap(INTERMISSION_MAP)[0];
  const animalCount: number = INTERMISSION_MAP[intermissionId].animalPositions.length;

  const animalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, animalCount);

  return {
    ...gameData,
    intermissionId,
    animalIds,
    bets: []
  }
}