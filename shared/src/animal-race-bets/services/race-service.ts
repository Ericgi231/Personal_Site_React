import { BACKGROUND_SIZE } from "../constants/canvas-constants";
import { MaskData } from "../types";
import { TransformInfo } from "../types/canvas-types";

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

export interface JsonMaskData {
  width: number;
  height: number;
  mask: string;
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
  static fromJSON(json: JsonMaskData): CollisionMask {
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

function detectCollision(
  maskA: CollisionMask,
  maskB: CollisionMask,
  ax: number,
  ay: number,
  aSize: number,
  bx: number,
  by: number,
  bSize: number
): boolean {
  // Bounding box overlap check first for speed
  const leftA = ax - aSize / 2;
  const topA = ay - aSize / 2;
  const leftB = bx - bSize / 2;
  const topB = by - bSize / 2;
  if (
    leftA + aSize < leftB || leftA > leftB + bSize ||
    topA + aSize < topB || topA > topB + bSize
  ) {
    return false;
  }
  // Pixel-perfect overlap
  for (let cy = 0; cy < aSize; ++cy) {
    for (let cx = 0; cx < aSize; ++cx) {
      const pxA = Math.floor(leftA + cx);
      const pyA = Math.floor(topA + cy);
      if (!maskA.isSolid(cx, cy)) continue;
      // Map A's pixel to B's coordinate space
      const pxB = pxA - leftB;
      const pyB = pyA - topB;
      if (pxB < 0 || pxB >= bSize || pyB < 0 || pyB >= bSize) continue;
      if (maskB.isSolid(pxB, pyB)) {
        return true;
      }
    }
  }
  return false;
}

function calcVelocity(angle: number, speed: number, simStep: number): {dx: number, dy: number} {
  const dt = simStep / 1000;
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

export class RaceSimulator {
  private readonly SIM_STEP_MS = 16.67;
  private readonly MAX_RACE_DURATION_MS = 300000; // 5 minutes
  private readonly BASE_SPEED = 400;

  private trackMask: CollisionMask;
  private goalMask: CollisionMask;
  private goalPosition: { x: number; y: number };
  private animals:  AnimalGameData[];
  private rng: () => number;

  private transforms: Array<TransformInfo[]> = [];
  private elapsedMs: number = 0;
  private winnerIndex: number | null = null;

  public constructor(
      trackMaskJson: JsonMaskData, 
      goalMaskJson: JsonMaskData, 
      goalPosition: { x: number; y: number },
      animalMasksJson: JsonMaskData[], 
      animalStartPositions: { x: number; y: number }[],
      seed: number) 
  {
    this.rng = createSeededRNG(seed);
    this.trackMask = CollisionMask.fromJSON(trackMaskJson);
    this.goalMask = CollisionMask.fromJSON(goalMaskJson);
    this.goalPosition = goalPosition;
    this.animals = animalMasksJson.map((json, idx) => {
      const start = animalStartPositions[idx];
      return {
        mask: CollisionMask.fromJSON(json),
        coordinates: { x: start.x, y: start.y }, // deep copy
        angle: getRandomAngle(this.rng),
        speed: this.BASE_SPEED
      };
    });
  }

  public simulateRace(): {winnerIndex: number | null, durationMs: number, transforms: Array<TransformInfo[]>} {
    while (this.elapsedMs < this.MAX_RACE_DURATION_MS) {
      const positions = this.step();
      if (this.winnerIndex !== null) break;
      const transform: TransformInfo[] = this.animals.map((animal, idx) => ({
        coordinates: { x: positions[idx].x, y: positions[idx].y },
        size: { w: animal.mask.width, h: animal.mask.height }
      }));
      this.transforms.push(transform);
      this.elapsedMs += this.SIM_STEP_MS;
    }
    return { winnerIndex: this.winnerIndex, durationMs: this.elapsedMs, transforms: this.transforms };
  }

  private step(): {x: number, y: number}[] {
    for (let i = 0; i < this.animals.length; ++i) {
      const mask = this.animals[i]!.mask;
      const cords = this.animals[i]!.coordinates;
      const angle = this.animals[i]!.angle;
      const speed = this.animals[i]!.speed;
      const velocity = calcVelocity(angle, speed, this.SIM_STEP_MS);

      let won = false;
      // hit trophy
      if (detectCollision(
        mask, this.goalMask,
        cords.x + velocity.dx, cords.y + velocity.dy, ANIMAL_SIZE,
        this.goalPosition.x, this.goalPosition.y, ANIMAL_SIZE
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        won = true;
      } else if (detectCollision(
        mask, this.goalMask,
        cords.x + velocity.dx, cords.y, ANIMAL_SIZE,
        this.goalPosition.x, this.goalPosition.y, ANIMAL_SIZE
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        won = true;
      } else if (detectCollision(
        mask, this.goalMask,
        cords.x, cords.y + velocity.dy, ANIMAL_SIZE,
        this.goalPosition.x, this.goalPosition.y, ANIMAL_SIZE
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        won = true;
      }

      if (won) {
        this.winnerIndex = i;
        this.elapsedMs = (this.transforms.length+1) * this.SIM_STEP_MS;
        return this.animals.map(a => a.coordinates);
      }

      let bounced = false;
      // hit wall
      if (detectCollision(
        mask, this.trackMask,
        cords.x + velocity.dx, cords.y + velocity.dy, ANIMAL_SIZE,
        this.trackMask.width / 2, this.trackMask.height / 2, this.trackMask.width
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        bounced = true;
      } else if (detectCollision(
        mask, this.trackMask,
        cords.x + velocity.dx, cords.y, ANIMAL_SIZE,
        this.trackMask.width / 2, this.trackMask.height / 2, this.trackMask.width
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        bounced = true;
      } else if (detectCollision(
        mask, this.trackMask,
        cords.x, cords.y + velocity.dy, ANIMAL_SIZE,
        this.trackMask.width / 2, this.trackMask.height / 2, this.trackMask.width
      )) {
        this.animals[i]!.angle = getRandomAngle(this.rng);
        bounced = true;
      }

      //TODO handle animal-animal collisions better

      if (!bounced) {
        cords.x += velocity.dx;
        cords.y += velocity.dy;
      } 
    }
    return this.animals.map(a => a.coordinates);
  }
}