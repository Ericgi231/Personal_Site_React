import { useEffect, useState } from 'react';
import { useGameStore } from '../stores';
import { SpriteData } from '@my-site/shared/animal-race-bets';
import { phaseFrameGenerators } from '../services/frameGenerationService';

export function useFrameGenerator() : SpriteData[] {
  const { gameData } = useGameStore();
  const [frame, setFrame] = useState([] as SpriteData[]);
  useEffect(() => {
    let running = true;
    const gen = phaseFrameGenerators[gameData.phase.name](gameData);
    const SIM_STEP_MS = 1000 / 60;
    let prevFrame: SpriteData[] = [];
    let currFrame: SpriteData[] = [];
    let lastStepTime = performance.now();
    let accumulator = 0;

    // Fast-forward logic for late joiners
  const now = Date.now();
  const startTime = typeof gameData.phase.startTime === 'number' ? gameData.phase.startTime : new Date(gameData.phase.startTime).getTime();
  const elapsedMs = Math.max(0, now - startTime);
  let fastForwardFrames = Math.floor(elapsedMs / SIM_STEP_MS);
  let fastForwarding = fastForwardFrames > 0;

    async function advanceSim() {
      const { value, done } = await gen.next();
      if (!done && value) {
        prevFrame = currFrame.length ? currFrame : value;
        currFrame = value;
      }
    }

    // Fast-forward simulation to current race time
    async function fastForward() {
      const BATCH_SIZE = 100;
      let i = 0;
      function processBatch() {
        let batchCount = 0;
        while (i < fastForwardFrames && batchCount < BATCH_SIZE) {
          // Note: advanceSim is async, but we want to process quickly, so use .then
          advanceSim();
          batchCount++;
          i++;
        }
        setFrame(currFrame);
        if (i < fastForwardFrames) {
          setTimeout(processBatch, 0);
        } else {
          // Ensure UI is at latest state after fast-forward
          setFrame(currFrame);
          fastForwarding = false;
          animate();
        }
      }
      processBatch();
    }

    // Run first frame immediately
    (async () => {
      if (fastForwarding) {
        await fastForward();
      } else {
        await advanceSim();
      }
      animate();
    })();

    async function animate() {
      if (!running) return;
      const now = performance.now();
      let delta = now - lastStepTime;
      lastStepTime = now;
      accumulator += delta;

      // Advance simulation as many times as needed, always await
      while (accumulator >= SIM_STEP_MS) {
        await advanceSim();
        accumulator -= SIM_STEP_MS;
      }

      // Interpolate between prevFrame and currFrame
      const alpha = accumulator / SIM_STEP_MS;
      if (prevFrame.length && currFrame.length && prevFrame.length === currFrame.length) {
        const interpFrame = currFrame.map((sprite, idx) => {
          const prev = prevFrame[idx] as any;
          if ((sprite as any).prevPos && prev.transform && sprite.transform) {
            const interpPos = {
              x: prev.transform.pos.x + ((sprite.transform.coordinates.x - prev.transform.coordinates.x) * alpha),
              y: prev.transform.pos.y + ((sprite.transform.coordinates.y - prev.transform.coordinates.y) * alpha)
            };
            return { ...sprite, transform: { ...sprite.transform, pos: interpPos } };
          }
          return sprite;
        });
        setFrame(interpFrame);
      } else {
        setFrame(currFrame);
      }
      requestAnimationFrame(animate);
    }

    return () => {
      running = false;
    };
  }, [gameData]);
  return frame;
}