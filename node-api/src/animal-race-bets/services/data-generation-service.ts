import { ANIMAL_MAP, GamePhase, INTERMISSION_MAP, TRACK_MAP } from "@my-site/shared/animal-race-bets";
import { PHASE_DURATION_MAP, PHASE_ORDER } from "../data/phase-data";
import { AppData } from "../types/app-types";

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

export async function generateNewAppData(): Promise<AppData> {
  const intermissionId: string = selectRandomKeysFromMap(INTERMISSION_MAP)[0];
  const intermissionAnimalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, INTERMISSION_MAP[intermissionId].animalPositions.length);
  const trackId: string = selectRandomKeysFromMap(TRACK_MAP)[0];
  const raceAnimalIds: string[] = selectRandomKeysFromMap(ANIMAL_MAP, TRACK_MAP[trackId].animalPositions.length);
  return {
    gameData: {
      phase: {
        startTime: new Date(),
        name: PHASE_ORDER[0],
        durationMs: PHASE_DURATION_MAP[PHASE_ORDER[0]],
      },
      intermission: {
        id: intermissionId,
        animalIds: intermissionAnimalIds
      },
      race: {
        trackId: trackId,
        animalIds: raceAnimalIds,
        raceSeed: Math.floor(Math.random() * 100000),
      },
      bets: [],
    },
    backendData: {
      winnerId: 'test-winner', // TODO: set actual winner
      raceDurationMs: 5000,
    }, // TODO: set actual backend data for race
  }
}