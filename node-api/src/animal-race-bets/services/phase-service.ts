import { Server } from "socket.io";
import { AppData } from "../types/app-types";
import { emitGameData, emitPhaseInfo, emitWinnerId } from "./socket-service";
import { generateNewAppData } from "./data-generation-service";

export async function handleIntermissionPhase(io: Server, _appData: AppData): Promise<AppData> {
  const newAppData = await generateNewAppData();
  emitGameData(io, newAppData.gameData);
  return newAppData;
}

export async function handleBettingPhase(io: Server, appData: AppData): Promise<AppData> {
  emitPhaseInfo(io, appData.gameData.phase);
  return appData;
}

export async function handleRacePhase(io: Server, appData: AppData): Promise<AppData> {
  emitPhaseInfo(io, appData.gameData.phase);
  return appData;
}

export async function handleResultsPhase(io: Server, appData: AppData): Promise<AppData> {
  const winnerId = appData.backendData.winnerId;
  const updatedGameData = {
    ...appData.gameData,
    race: {
      ...appData.gameData.race,
      winnerId,
    }
  };
  emitWinnerId(io, winnerId);
  emitPhaseInfo(io, updatedGameData.phase);
  return {
    ...appData,
    gameData: updatedGameData,
  };
}

export async function handleLoadingPhase(_io: Server, appData: AppData): Promise<AppData> {
  return appData;
}