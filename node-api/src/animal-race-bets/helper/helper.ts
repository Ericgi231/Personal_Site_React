export const selectRandomKeysFromMap = <T>(map: Record<string, T>, num: number = 1): string[] => {
  const ids: string[] = Object.keys(map);
  if (num <= 1) {
    return [ids[Math.floor(Math.random() * ids.length)]];
  }
  if (num > ids.length) {
    throw new Error("Requested more keys than available in map");
  }
  return [...ids].sort(() => Math.random() - 0.5).slice(0, num);
}