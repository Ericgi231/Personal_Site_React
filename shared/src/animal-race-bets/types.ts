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
  startTime: Date;
  duration: number;
  currentPhase: GamePhase;

  // Intermission
  loadingSceneId?: string;
  loadingAnimalIds?: string[];

  // Betting & Race
  trackId?: string;
  animalIds?: string[];
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