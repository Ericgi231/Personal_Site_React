import { useEffect, useState } from 'react';
import { useGameStore } from '../stores';
import { CanvasAnimation, GamePhase, TransformInfo } from '@my-site/shared/animal-race-bets';
import {
  intermissionAnimationBuilder,
  bettingAnimationBuilder,
  raceAnimationBuilder,
  resultsAnimationBuilder,
  loadingAnimationBuilder
} from '../services/animationBuilderService';
import { getRaceTransforms } from '../services/raceSimulationService';

export function useAnimationBuilder(): Partial<Record<GamePhase, CanvasAnimation>> {
  const { gameData } = useGameStore();
  const [animations, setAnimations] = useState<Partial<Record<GamePhase, CanvasAnimation>>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const anim = await intermissionAnimationBuilder(gameData.intermission.id, gameData.intermission.animalIds);
      if (!cancelled) {
        setAnimations(prev => ({ ...prev, [GamePhase.Intermission]: anim }));
      }
    })();
    return () => { cancelled = true; };
  }, [gameData.intermission.id, gameData.intermission.animalIds]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const anim = await bettingAnimationBuilder(gameData.race.trackId, gameData.race.animalIds);
      if (!cancelled) {
        setAnimations(prev => ({ ...prev, [GamePhase.Betting]: anim }));
      }
    })();
    return () => { cancelled = true; };
  }, [gameData.race.trackId, gameData.race.animalIds]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const transforms: TransformInfo[][] = await getRaceTransforms(gameData);
      if (!gameData.race.trackId || !gameData.race.animalIds ) return;
      const anim = await raceAnimationBuilder(gameData.race.trackId, gameData.race.animalIds, transforms);
      if (!cancelled) {
        setAnimations(prev => ({ ...prev, [GamePhase.Race]: anim }));
      }
    })();
    return () => { cancelled = true; };
  }, [gameData.race.trackId, gameData.race.animalIds]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!gameData.race.trackId || !gameData.race.winnerId) return;
      const anim = await resultsAnimationBuilder(gameData.race.trackId, gameData.race.winnerId);
      if (!cancelled) {
        setAnimations(prev => ({ ...prev, [GamePhase.Results]: anim }));
      }
    })();
    return () => { cancelled = true; };
  }, [gameData.race.trackId, gameData.race.winnerId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const anim = await loadingAnimationBuilder();
      if (!cancelled) {
        setAnimations(prev => ({ ...prev, [GamePhase.Loading]: anim }));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return animations;
}