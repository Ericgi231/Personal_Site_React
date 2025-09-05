export interface ResultsData {
  randomNumber: number;
}

export function generateResultsData(): ResultsData {
  return {
    randomNumber: Math.floor(Math.random() * 1000)
  };
}

export const RESULTS_DURATION = 10000; // 10 seconds