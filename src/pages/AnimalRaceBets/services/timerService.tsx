export function getTimeRemaining(startTime?: Date, duration?: number): number {
  if (!startTime || !duration) return 0;
  const start = new Date(startTime).getTime();
  const now = Date.now();
  const remaining = Math.max(0, duration - (now - start));
  return Math.ceil(remaining / 1000);
}

export function formatTimeMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}