export enum GamePhase {
  Intermission = 'intermission',
  Betting = 'betting',
  Race = 'race',
  Results = 'results'
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
  loadingSceneId?: number;
  loadingAnimalIds?: number[];

  // Betting & Race
  mapId?: number;
  animalIds?: number[];
  bets?: Bet[];

  // Race & Results
  winnerId?: number;
}