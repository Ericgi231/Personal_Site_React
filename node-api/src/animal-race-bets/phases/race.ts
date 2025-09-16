// node-api/src/animal-race-bets/phases/race.ts
import { GameData, TRACK_MAP, ANIMAL_MAP, TrackData, AnimalData, getTrackLayoutPath, AnimalState } from "@my-site/shared/animal-race-bets";
import { createCanvas, loadImage } from "canvas";
import path from 'path';

export async function generateRaceData(gameData: GameData): Promise<GameData> {
  const track: TrackData = TRACK_MAP[gameData.trackId!];
  const animals: AnimalData[] = gameData.animalIds!.map(id => ANIMAL_MAP[id]);
  const raceSeed: number = Math.floor(Math.random() * 100000);
  //TODO create an animalStates array of AnimalState[] by combining the track.animalPositions and gameData.animalIds
  let animalStates: AnimalState[] = track.animalPositions.map((pos, idx) => ({
    id: gameData.animalIds![idx]!,
    x: pos.x,
    y: pos.y,
    angle: 0,
  }));
  const trackPath = path.resolve(__dirname, '../../../../public' + getTrackLayoutPath(track.id));
  return {
    ...gameData,
    winnerId: animals[0].id,
    raceSeed,
  };
}