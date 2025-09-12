import { GameData, GamePhase, Bet } from "@my-site/shared/animal-race-bets";

const RACE_DURATION = 20000; // 20 seconds

export function generateRaceData(): GameData {
  return {
    startTime: new Date(),
    duration: RACE_DURATION,
    currentPhase: GamePhase.Race,
    mapId: 1,
    animalIds: [101, 102, 103],
    bets: [
      { userId: "user1", amount: 100, animalId: 101 },
      { userId: "user2", amount: 50, animalId: 102 }
    ],
    winnerId: 101,
    loadingSceneId: 5,
    loadingAnimalIds: [101, 102, 103]
  };
}