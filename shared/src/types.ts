export type GameState = 'intermission' | 'betting' | 'race' | 'results';

export interface GameUpdatePayload {
  state: GameState;
  timeRemaining: number;
  timestamp: number;
  data: any;
}

export enum TestEnum {
  INTERMISSION = 'intermission',
  BETTING = 'betting', 
  RACE = 'race',
  RESULTS = 'results'
}