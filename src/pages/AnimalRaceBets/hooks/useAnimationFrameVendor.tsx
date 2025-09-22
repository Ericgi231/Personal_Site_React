import { useEffect, useState } from "react";
import { useGameStore } from "../stores";
import { AnimationFrame, CanvasAnimation, GamePhase } from "@my-site/shared/animal-race-bets";
import {  } from "../services/animationBuilderService";

export function useAnimationFrameVendor(animation: CanvasAnimation | undefined): AnimationFrame {
  const { gameData } = useGameStore();
  const [frame, setFrame] = useState<AnimationFrame | undefined>(undefined);

  useEffect(() => {
    if (!animation || !animation.frames || animation.frames.length === 0) {
      setFrame(undefined);
      return;
    }
    let running = true;
    const SIM_STEP_MS = 1000 / 60;
    let lastStepTime = performance.now();

    // Calculate the correct frame index for current time
    function getFrameIndex() {
      const now = Date.now();
      const startTime = typeof gameData.phase.startTime === 'number'
        ? gameData.phase.startTime
        : new Date(gameData.phase.startTime).getTime();
      const elapsedMs = Math.max(0, now - startTime);
      return Math.min(
        Math.floor(elapsedMs / SIM_STEP_MS),
        animation?.frames.length! - 1
      );
    }

    function animate() {
      if (!running) return;
      const frameIndex = getFrameIndex();
      setFrame(animation?.frames[frameIndex]);
      requestAnimationFrame(animate);
    }

    animate();
    return () => {
      running = false;
    };
  }, [animation, gameData.phase.startTime]);

  return frame ?? { sprites: [] };
}