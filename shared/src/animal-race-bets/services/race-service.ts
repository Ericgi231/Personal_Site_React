import { BACKGROUND_SIZE } from "../constants/canvas-constants";
import { MaskData } from "../types";
import { TransformInfo } from "../types/canvas-types";


const BASE_SPEED = 2.5;
const SIM_STEP_MS = 16.67; // fixed simulation step

// Deterministic PRNG (Mulberry32)
function createSeededRNG(seed: number) {
  let t = seed;
  return function() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
    return ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}

export interface AnimalGameData {
  mask: CollisionMask;
  coordinates: { x: number; y: number };
  angle: number;
  speed: number;
}

export class CollisionMask {
  width: number;
  height: number;
  mask: Uint8Array;
  constructor(imageData: ImageData, alphaThreshold: number = 128) {
    this.width = imageData.width;
    this.height = imageData.height;
    this.mask = new Uint8Array(this.width * this.height);
    if (!imageData.data) return;
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        const idx = (y * this.width + x) * 4 + 3;
        this.mask[y * this.width + x] = imageData.data[idx] && imageData.data[idx] > alphaThreshold ? 1 : 0;
      }
    }
  }
  static fromJSON(json: { width: number; height: number; mask: string }): CollisionMask {
    const maskArr = new Uint8Array(json.width * json.height);
    for (let i = 0; i < json.mask.length; ++i) {
      maskArr[i] = json.mask[i] === '1' ? 1 : 0;
    }
    const obj = Object.create(CollisionMask.prototype) as CollisionMask;
    obj.width = json.width;
    obj.height = json.height;
    obj.mask = maskArr;
    return obj;
  }
  isSolid(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.mask[y * this.width + x] === 1;
  }
}

function detectCollision(mask1: CollisionMask, mask2: CollisionMask, nx: number, ny: number, size: number): boolean {
  // nx, ny are now the center of the sprite; adjust to top-left
  const left = nx - size / 2;
  const top = ny - size / 2;
  for (let cy = 0; cy < size; ++cy) {
    for (let cx = 0; cx < size; ++cx) {
      const px = Math.floor(left + cx);
      const py = Math.floor(top + cy);
      if (px < 0 || px >= BACKGROUND_SIZE || py < 0 || py >= BACKGROUND_SIZE) continue;
      if (!mask1.isSolid(cx, cy)) continue;
      if (mask2.isSolid(px, py)) {
        return true;
      }
    }
  }
  return false;
}

function calcVelocity(angle: number, speed: number): {dx: number, dy: number} {
  // speed is pixels per second; scale by SIM_STEP_MS
  const dt = SIM_STEP_MS / 1000;
  return {
    dx: Math.cos(angle) * speed * dt,
    dy: Math.sin(angle) * speed * dt,
  };
}


function getRandomVelocity(dx: number, dy: number, rng: () => number): [number, number] {
  const angle = rng() * Math.PI * 2;
  const speed = Math.sqrt(dx * dx + dy * dy);
  return [Math.cos(angle) * speed, Math.sin(angle) * speed];
}

function getRandomAngle(rng: () => number): number {
  return rng() * Math.PI * 2;
}

export function getDatafromImage(img: HTMLImageElement, size: number): ImageData {
  const offscreenLayout = document.createElement('canvas');
  offscreenLayout.width = size;
  offscreenLayout.height = size;
  const offscreenLayoutCtx = offscreenLayout.getContext('2d')!;
  offscreenLayoutCtx.clearRect(0, 0, size, size);
  offscreenLayoutCtx.drawImage(img, 0, 0, size, size);
  return offscreenLayoutCtx.getImageData(0, 0, size, size);
}

const ANIMAL_SIZE = 96;

export function step(layoutMask: CollisionMask, animals: AnimalGameData[], rng : () => number) : Array<{x: number, y:number}> {
  for (let i = 0; i < animals.length; ++i) {
    const mask = animals[i]!.mask;
    const cords = animals[i]!.coordinates;
    const angle = animals[i]!.angle;
    const speed = animals[i]!.speed;

    let bounced = false;
    const velocity = calcVelocity(angle, speed);
    if (detectCollision(mask, layoutMask, cords.x + velocity.dx, cords.y + velocity.dy, ANIMAL_SIZE)) {
      animals[i]!.angle = getRandomAngle(rng);
      bounced = true;
    } else if (detectCollision(mask, layoutMask, cords.x + velocity.dx, cords.y, ANIMAL_SIZE)) {
      animals[i]!.angle = getRandomAngle(rng);
      bounced = true;
    } else if (detectCollision(mask, layoutMask, cords.x, cords.y + velocity.dy, ANIMAL_SIZE)) {
      animals[i]!.angle = getRandomAngle(rng);
      bounced = true;
    }
    if (cords.x < 0) { cords.x = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy, rng); bounced = true; }
    if (cords.y < 0) { cords.y = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy, rng); bounced = true; }
    if (cords.x + ANIMAL_SIZE > BACKGROUND_SIZE) { cords.x = BACKGROUND_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy, rng); bounced = true; }
    if (cords.y + ANIMAL_SIZE > BACKGROUND_SIZE) { cords.y = BACKGROUND_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy, rng); bounced = true; }
    if (!bounced) {
      cords.x += velocity.dx;
      cords.y += velocity.dy;
    }
  }
  return animals.map(a => a.coordinates);
}

export function simulateRace(trackMask: { width: number; height: number; mask: string }, animalMasks: { width: number; height: number; mask: string }[], seed: number): {winnerIndex: number, durationMs: number, frames: Array<TransformInfo[]>} {
  // Read masks from precomputed JSON
  const layoutMask = CollisionMask.fromJSON(trackMask);

  // Create deterministic RNG
  const rng = createSeededRNG(seed);

  // Initialize animal states
  let animalStates: AnimalGameData[] = animalMasks.map((json, idx) => {
    const mask = CollisionMask.fromJSON(json);
    // Initial positions: for now, just spread out
    const pos = { x: 200 + idx * 100, y: 200 };
    return {
      mask,
      coordinates: pos,
      angle: getRandomAngle(rng),
      speed: 200
    };
  });

  const durationMs = 120000;
  const winnerIndex = 0;
  const frames: Array<TransformInfo[]> = [];
  let simTime = 0;
  while (simTime < durationMs) {
    // Advance simulation
    const positions = step(layoutMask, animalStates, rng);
    // Save positions for this frame
    const frame: TransformInfo[] = animalStates.map((animal, idx) => ({
      coordinates: { x: positions[idx].x, y: positions[idx].y },
      size: { w: animal.mask.width, h: animal.mask.height }
    }));
    frames.push(frame);
    simTime += SIM_STEP_MS;
  }
  return { winnerIndex, durationMs, frames };
}