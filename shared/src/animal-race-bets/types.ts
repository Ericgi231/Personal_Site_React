export enum GameStateEnum {
  Intermission = 'intermission',
  Betting = 'betting',
  Race = 'race',
  Results = 'results'
}

export interface TrackAnimalStageData {
  trackId: number;
  animalIds: number[];
}

export interface IntermissionStateData {
  sceneId: number;
  animalIds: number[];
}

export interface BettingStateData extends TrackAnimalStageData {
}

export interface RaceStateData extends TrackAnimalStageData {
  seed: number;
}

export interface ResultsStateData {
  winnerId: number;
}

export interface GameStages {
  intermission: IntermissionStateData;
  betting: BettingStateData;
  race: RaceStateData;
  results: ResultsStateData;
}

export type GameStateData =
  | { gameState: GameStateEnum.Intermission; data: IntermissionStateData }
  | { gameState: GameStateEnum.Betting; data: BettingStateData }
  | { gameState: GameStateEnum.Race; data: RaceStateData }
  | { gameState: GameStateEnum.Results; data: ResultsStateData };

export interface GameData {
  startTime: Date;
  duration: number;
  trackId: number;
  animalIds: number[];
  state: GameStateData;
}