import { useEffect, useState } from 'react';
import { getTimeRemainingSeconds } from '../services/timerService';

export function usePhaseTimer(startTime: Date, duration: number) {
  const [remaining, setRemaining] = useState(getTimeRemainingSeconds(startTime, duration, new Date()));
  useEffect(() => {
    setRemaining(getTimeRemainingSeconds(startTime, duration, new Date()));
    const interval = setInterval(() => {
      setRemaining(getTimeRemainingSeconds(startTime, duration, new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, duration]);
  return remaining;
}