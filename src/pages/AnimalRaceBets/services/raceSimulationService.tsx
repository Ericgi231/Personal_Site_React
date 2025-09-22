import { GameData, simulateRace, TransformInfo } from "@my-site/shared/animal-race-bets";

export async function getRaceTransforms(trackId: string, animalIds: string[], seed: number): Promise<TransformInfo[][]> {
  // TODO: Update with web worker for faster compute

  // Load track mask from mask.json
  const trackMaskUrl = `/assets/animal-race-bets/tracks/${trackId}/mask.json`;
  const trackMaskRes = await fetch(trackMaskUrl);
  if (!trackMaskRes.ok) throw new Error(`Failed to fetch track mask: ${trackMaskUrl}`);
  const trackMaskJson = await trackMaskRes.json();

  // Load animal masks from mask.json
  const animalMaskJsons = await Promise.all(
    animalIds.map(async (animalId) => {
      const maskUrl = `/assets/animal-race-bets/animals/${animalId}/mask.json`;
      const maskRes = await fetch(maskUrl);
      if (!maskRes.ok) throw new Error(`Failed to fetch animal mask: ${maskUrl}`);
      const maskJson = await maskRes.json();
      return { id: animalId, ...maskJson };
    })
  );

  // Call simulateRace to get precomputed frames
  const { winnerIndex, durationMs, frames} = simulateRace(trackMaskJson, animalMaskJsons, seed);
  return frames;
}