export interface RaceData {
  randomNumber: number;
}

export function generateRaceData(): RaceData {
  return {
    randomNumber: Math.floor(Math.random() * 1000)
  };
}

export const RACE_DURATION = 20000; // 20 seconds