import { GamePhase } from '@my-site/shared/animal-race-bets';

/**
 * Max duration of each game phase in milliseconds.
 */
export const PHASE_DURATION_MAP: Record<GamePhase, number> = {
    [GamePhase.Intermission]: 10000,
    [GamePhase.Betting]: 10000,
    [GamePhase.Race]: 300000, // Max 5 minutes, actual duration set dynamically
    [GamePhase.Results]: 5000,
    [GamePhase.Loading]: 100,
    [GamePhase.Connecting]: 100,
};

/**
 * Order of game phases.
 */
export const PHASE_ORDER: GamePhase[] = [
    GamePhase.Intermission,
    GamePhase.Betting,
    GamePhase.Race,
    GamePhase.Results,
];