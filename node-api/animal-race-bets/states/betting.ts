export interface BettingData {
  randomNumber: number;
}

export function generateBettingData(): BettingData {
  return {
    randomNumber: Math.floor(Math.random() * 1000)
  };
}

export const BETTING_DURATION = 30000; // 30 seconds