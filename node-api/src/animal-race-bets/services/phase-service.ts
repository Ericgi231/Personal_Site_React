import { AppData } from "../types/app-types";
import { generateIntermissionInfo, generatePhaseInfo, generateRaceInfo } from "./data-generation-service";
import { getRaceResults } from "./race-simulation-service";
import { GamePhase } from "@my-site/shared/animal-race-bets";

/**
 * Update the phase to Intermission and generate new RaceInfo
 * @param appData Current application data
 * @returns Updated application data
 */
export function handleIntermissionPhase(appData: AppData): AppData {
  const race = generateRaceInfo();
  const raceResults = getRaceResults(race.trackId, race.animalIds, race.raceSeed);
  return {
    ...appData,
    gameData: {
      ...appData.gameData,
      phase: generatePhaseInfo(GamePhase.Intermission),
      race,
    },
    backendData: {
      ...appData.backendData,
      winnerId: raceResults.winnerId,
      raceDurationMs: raceResults.durationMs,
    }
  }
}

/**
 * Update the phase to Betting and generate new IntermissionInfo
 * @param appData Current application data
 * @returns Updated application data
 */
export function handleBettingPhase(appData: AppData): AppData {
  return {
    ...appData,
    gameData: {
      ...appData.gameData,
      phase: generatePhaseInfo(GamePhase.Betting),
      intermission: generateIntermissionInfo(),
    }
  }
}

/**
 * Update the phase to Race and set the winnerId in GameData
 * @param appData Current application data
 * @returns Updated application data
 */
export function handleRacePhase(appData: AppData): AppData {
  return {
    ...appData,
    gameData: {
      ...appData.gameData,
      phase: generatePhaseInfo(GamePhase.Race),
      race: {
        ...appData.gameData.race,
        winnerId: appData.backendData.winnerId,
      }
    },
  };
}

/**
 * Update the phase to Results
 * @param appData Current application data
 * @returns Updated application data
 */
export function handleResultsPhase(appData: AppData): AppData {
  return {
    ...appData,
    gameData: {
      ...appData.gameData,
      phase: generatePhaseInfo(GamePhase.Results),
    }
  }
}

/**
 * Generic handler for phases that do not require any data updates
 * @param appData Current application data
 * @returns Updated application data
 */
export function handleLoadingPhase(appData: AppData): AppData {
  return appData;
}