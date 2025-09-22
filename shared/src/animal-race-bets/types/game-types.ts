export enum GamePhase {
  Intermission = 'intermission',
  Betting = 'betting',
  Race = 'race',
  Results = 'results',
  Loading = 'loading',
  Connecting = 'connecting',
}

export interface BetInfo {
  userId: string;
  amount: number;
  animalId: number;
}

export interface PhaseInfo {
  startTime: Date;
  name: GamePhase;
  durationMs: number;
}

export interface IntermissionInfo {
  id: string;
  animalIds: string[];
}

export interface RaceInfo {
  trackId: string;
  animalIds: string[];
  raceSeed: number;
  winnerId?: string;
}

export interface GameData {
  phase: PhaseInfo;
  intermission: IntermissionInfo;
  race: RaceInfo;
  bets: BetInfo[];
}