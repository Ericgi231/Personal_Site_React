import { useGameStore } from '../stores';
import { CanvasAnimation, GamePhase } from '@my-site/shared/animal-race-bets';

export function useAnimationSelector(animations: Partial<Record<GamePhase, CanvasAnimation>>): CanvasAnimation | undefined {
  return animations[useGameStore(state => state.gameData.phase.name)];
}