import { GameData } from "@my-site/shared/animal-race-bets";

/**
 * Standin for the results phase data updates.
 * @param gameData The current game data
 */
export async function generateResultsData(gameData: GameData): Promise<GameData> {
  return {
    ...gameData,
  };
}