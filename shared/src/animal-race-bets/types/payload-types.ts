import { GameData, IntermissionInfo, PhaseInfo, RaceInfo } from "./game-types";
import { UserData } from "./user-types";

export interface FullUpdatePayload {
  gameData: GameData;
}

export interface UserUpdatePayload {
  userData: UserData;
}

export interface IntermissionUpdatePayload {
  phaseInfo: PhaseInfo;
  raceInfo: RaceInfo;
}

export interface BettingUpdatePayload {
  phaseInfo: PhaseInfo;
  intermissionInfo: IntermissionInfo;
}

export interface RaceUpdatePayload {
  phaseInfo: PhaseInfo;
  winnerId: string;
}

export interface PhaseUpdatePayload {
  phaseInfo: PhaseInfo;
}