import { GameData } from "@my-site/shared/animal-race-bets";

export function generateBettingData(gameData: GameData): void {
  gameData.bets = []; // or keep existing bets
  // Add any other betting-specific updates here
  // Example: gameData.randomNumber = Math.floor(Math.random() * 1000);
}