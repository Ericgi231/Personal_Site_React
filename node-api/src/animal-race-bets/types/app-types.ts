import { GameData } from "@my-site/shared/animal-race-bets";

export interface AppData{
  gameData: GameData;
  backendData: BackendData;
}

export interface BackendData {
  winnerId: string;
  raceDurationMs: number;
}