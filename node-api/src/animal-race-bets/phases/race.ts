// node-api/src/animal-race-bets/phases/race.ts
import { GameData, TRACK_MAP, ANIMAL_MAP, TrackData, AnimalData, getTrackLayoutPath, AnimalState, moveAnimal, bounceIfWall } from "@my-site/shared/animal-race-bets";
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

export async function simulateRaceBackend(trackLayoutPath: string, animalStartStates: AnimalState[], goal: {x: number, y:number}, seed: number): Promise<string> {
  const canvas = createCanvas(1920, 1920);
  const ctx = canvas.getContext('2d');
  const layoutImg = await loadImage(trackLayoutPath);
  ctx.drawImage(layoutImg, 0, 0);
  const layoutData = ctx.getImageData(0, 0, 1920, 1920).data;

  let animals: AnimalState[] = animalStartStates.map(s => ({ ...s }));
  let winnerId = '';
  for (let frame = 0; frame < 9000; frame++) {
    for (const animal of animals) {
      moveAnimal(animal, 2);
      bounceIfWall(animal, layoutData, 1920, 1920);
      // Check for goal
      if (Math.abs(animal.x - goal.x) < 10 && Math.abs(animal.y - goal.y) < 10) {
        winnerId = animal.id;
        break;
      }
    }
    if (winnerId) break;
  }
  return winnerId;
}