// Custom hook for client-side countdown
import { useState, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

export const useGameTimer = () => {
  const { stateStartTime, stateDuration, currentState } = useGameStore();
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!stateStartTime || !stateDuration) return;

    const updateTimer = () => {
      const elapsed = Date.now() - stateStartTime;
      const remaining = Math.max(0, (stateDuration * 1000) - elapsed);
      setTimeRemaining(Math.ceil(remaining / 1000));
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [stateStartTime, stateDuration, currentState]);

  return timeRemaining;
};