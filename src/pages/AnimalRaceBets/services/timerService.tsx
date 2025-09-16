export function getTimeRemaining(startTime: Date, duration: number): number {
  return Math.max(0, Math.ceil((duration - (Date.now() - new Date(startTime).getTime())) / 1000));
}

export function formatTimeMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}