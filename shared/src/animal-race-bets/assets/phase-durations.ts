import { GamePhase } from '../types';

export const DEFAULT_PHASE_DURATION_MS = 10000;

export const PHASE_DURATION_MAP: Record<GamePhase, number> = {
    [GamePhase.Intermission]: 3000,
    [GamePhase.Betting]: 1000,
    [GamePhase.Race]: 30000,
    [GamePhase.Results]: 1000,
    [GamePhase.Loading]: 1000,
};