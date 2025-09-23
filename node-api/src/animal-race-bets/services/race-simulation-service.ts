import { RaceSimulator, TRACK_MAP } from "@my-site/shared/animal-race-bets";
import path from "path";
import fs from "fs";

export function getRaceResults(trackId: string, animalIds: string[], seed: number): {winnerId: string, durationMs: number} {
	// Use ASSET_PATH env variable for asset base path
	const ASSET_PATH = process.env.ASSET_PATH || path.resolve(__dirname, '../../../../public/assets/');

	// Resolve mask file paths
	const trackMaskPath = path.join(ASSET_PATH, `animal-race-bets/tracks/${trackId}/mask.json`);
	const goalMaskPath = path.join(ASSET_PATH, `animal-race-bets/objects/goal/mask.json`);
	const animalMaskPaths = animalIds.map(animalId =>
		path.join(ASSET_PATH, `animal-race-bets/animals/${animalId}/mask.json`)
	);

	// Load mask JSONs synchronously
	const trackMaskJson = JSON.parse(fs.readFileSync(trackMaskPath, "utf8"));
	const goalMaskJson = JSON.parse(fs.readFileSync(goalMaskPath, "utf8"));
	const animalMaskJsons = animalMaskPaths.map(p => JSON.parse(fs.readFileSync(p, "utf8")));

	// Call simulateRace to get precomputed frames
	const raceSim: RaceSimulator = new RaceSimulator(
		trackMaskJson,
		goalMaskJson,
		TRACK_MAP[trackId]!.goalPosition.coordinates,
		animalMaskJsons,
		TRACK_MAP[trackId]!.animalPositions.map(p => ({ x: p.coordinates.x, y: p.coordinates.y })),
		seed
	);

	const results: {winnerIndex: number | null, durationMs: number} = raceSim.simulateRace();
	const winnerId = animalIds[results.winnerIndex ?? -1] || '';

	return {winnerId, durationMs: results.durationMs};
}
