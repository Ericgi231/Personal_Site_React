export function getTimeRemaining(startTime: Date, duration: number): number {
  return Math.max(0, Math.ceil((duration - (Date.now() - new Date(startTime).getTime())) / 1000));
}