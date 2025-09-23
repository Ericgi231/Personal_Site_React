import { ANIMAL_MAP, GamePhase, INTERMISSION_MAP, IntermissionInfo, PhaseInfo, RaceInfo, TRACK_MAP } from "@my-site/shared/animal-race-bets";
import { PHASE_DURATION_MAP, PHASE_ORDER } from "../data/phase-data";
import { AppData } from "../types/app-types";
import { getRaceResults } from "./race-simulation-service";

const selectRandomKeysFromMap = <T>(map: Record<string, T>, num: number = 1): string[] => {
  const ids: string[] = Object.keys(map);
  if (num <= 1) {
    return [ids[Math.floor(Math.random() * ids.length)]];
  }
  if (num > ids.length) {
    throw new Error("Requested more keys than available in map");
  }
  return [...ids].sort(() => Math.random() - 0.5).slice(0, num);
}

export function generateEmptyAppData(): AppData {
  return {
    gameData:{
      phase: {
        startTime: new Date(0),
        name: GamePhase.Loading,
        durationMs: 0,
      },
      intermission: {
        id: '',
        animalIds: [],
      },
      race: {
        trackId: '',
        animalIds: [],
        raceSeed: 0,
      },
      bets: [],
    },
    backendData: {
      winnerId: '',
      raceDurationMs: 0,
    }
  }
}

export function generateNewAppData(): AppData {
  const race = generateRaceInfo();
  const raceResults = getRaceResults(race.trackId, race.animalIds, race.raceSeed);

  return {
    gameData: {
      phase: generatePhaseInfo(PHASE_ORDER[0]),
      intermission: generateIntermissionInfo(),
      race,
      bets: [],
    },
    backendData: {
      winnerId: raceResults.winnerId,
      raceDurationMs: raceResults.durationMs,
    }
  }
}

export function generatePhaseInfo(phase: GamePhase): PhaseInfo {
  return {
    startTime: new Date(),
    name: phase,
    durationMs: PHASE_DURATION_MAP[phase]
  }
}

export function generateIntermissionInfo(): IntermissionInfo {
  const id: string = selectRandomKeysFromMap(INTERMISSION_MAP)[0];
  const animalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, INTERMISSION_MAP[id].animalPositions.length);
  return {
    id,
    animalIds
  }
}

export function generateRaceInfo(): RaceInfo {
  const trackId: string = selectRandomKeysFromMap(TRACK_MAP)[0];
  const animalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, TRACK_MAP[trackId].animalPositions.length);
  const raceSeed = Math.floor(Math.random() * 100000);
  return {
    trackId,
    animalIds,
    raceSeed,
  }
}