import { GameData } from "@my-site/shared/animal-race-bets";

export function generateRaceData(gameData: GameData): void {
  gameData.mapId = 1;
  gameData.animalIds = [101, 102, 103];
  gameData.bets = [
    { userId: "user1", amount: 100, animalId: 101 },
    { userId: "user2", amount: 50, animalId: 102 }
  ];
  gameData.winnerId = 101;
  // Add any other race-specific updates here
}