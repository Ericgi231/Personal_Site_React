export enum GamePhase {
  Intermission = 'intermission',
  Betting = 'betting',
  Race = 'race',
  Results = 'results',
  Loading = 'loading'
}

export enum AccountType {
  Guest = 'guest',
  Registered = 'registered',
  Invalid = 'invalid'
}

export interface Bet {
  userId: string;
  amount: number;
  animalId: number;
}

export interface GameData {
  // Always present
  currentPhase: GamePhase;
  startTime: Date;

  // Intermission
  intermissionId?: string;

  // Betting & Race
  trackId?: string;
  animalIds?: string[];
  raceSeed?: number;
  bets?: Bet[];

  // Race & Results
  winnerId?: string;
}

export interface UserData {
  id: number;
  type: AccountType;
  name: string;
  balance: number;
}

export interface AnimalInfo {
  filePath: string;
  positionInfo: PositionInfo;
}

export interface PositionInfo {
  position: {x: number, y:number};
  flipped: boolean;
  size: number;
}