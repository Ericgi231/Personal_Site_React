import { useEffect, useState } from 'react';
import { getTimeRemaining } from '../services/timerService';

export function usePhaseTimer(startTime: Date, duration: number) {
  const [remaining, setRemaining] = useState(getTimeRemaining(startTime, duration));
  useEffect(() => {
    setRemaining(getTimeRemaining(startTime, duration));
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(startTime, duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, duration]);
  return remaining;
}