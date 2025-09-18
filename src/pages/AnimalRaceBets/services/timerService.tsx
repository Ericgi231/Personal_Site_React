/**
 * Get the elapsed time in milliseconds since startTime
 * @param startTime Start time
 * @param currentTime Current time
 * @returns Time elapsed in milliseconds since startTime
 */
export function getElapsedTimeMs(startTime: Date, currentTime: Date): number {
  return new Date(currentTime).getTime() - new Date(startTime).getTime();
}

/**
 * Calculate the remaining time in seconds for the current phase.
 * @param startTime The start time of the current phase.
 * @param duration The total duration of the current phase in milliseconds.
 * @param currentTime The current time.
 * @returns The remaining time in seconds.
 */
export function getTimeRemainingSeconds(startTime: Date, duration: number, currentTime: Date): number {
  // TODO: Handle different time zones if necessary
  return Math.max(0, Math.ceil((duration - (getElapsedTimeMs(startTime, currentTime))) / 1000));
}

/**
 * Convert seconds to M:SS format
 * @param seconds number of seconds to format
 * @returns formatted time string in M:SS format
 */
export function formatTimeMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}