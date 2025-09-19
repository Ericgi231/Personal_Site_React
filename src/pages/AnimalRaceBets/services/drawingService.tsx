
import { ANIMAL_SIZE, BACKGROUND_SIZE, GameData, GamePhase, GOAL_SIZE, INTERMISSION_MAP, SpriteData, TRACK_MAP, TransformInfo } from '@my-site/shared/animal-race-bets';
import { getAnimalSpritePath, getAnimalWinnerPath, getGoalPath, getIntermissionPath, getTrackBackgroundPath, getTrackLayoutPath, getTrackResultsPath } from '../constants';
import { getCachedImage } from './imageLoadingService';

function scaleCanvasDevicePixelRatio(ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  ctx.canvas.width = BACKGROUND_SIZE * dpr;
  ctx.canvas.height = BACKGROUND_SIZE * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function setDefaultCanvasRatio(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = BACKGROUND_SIZE;
  ctx.canvas.height = BACKGROUND_SIZE;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

async function buildSprite(filePath: string, transform: TransformInfo) : Promise<SpriteData> 
{
  return {
    img: await getCachedImage(filePath),
    transform
  }
}

function buildBackgroundSprite(filePath: string): Promise<SpriteData> {
  return buildSprite(filePath, {
    pos: {x:BACKGROUND_SIZE/2, y:BACKGROUND_SIZE/2},
    size: {w:BACKGROUND_SIZE, h:BACKGROUND_SIZE}
  });
}

function drawSprite(ctx: CanvasRenderingContext2D, sprite: SpriteData) {
  const { img, transform } = sprite;
  const { pos, size, flipped } = transform;
  ctx.save();
  ctx.translate(pos.x, pos.y);
  if (flipped) ctx.scale(-1, 1);
  ctx.drawImage(img, -size.w / 2, -size.h / 2, size.w, size.h);
  ctx.restore();
}

export const phaseRenderers: Record<GamePhase, (ctx: CanvasRenderingContext2D, gameData: GameData) => () => void> = {
  intermission: drawIntermission,
  betting: drawBetting,
  race: drawRace,
  results: drawResults,
  loading: () => {return () => {}}, //TODO: implement loading screen, likely to never be seen, low priority
};

export function drawIntermission(ctx: CanvasRenderingContext2D, gameData: GameData): () => void {
  scaleCanvasDevicePixelRatio(ctx);
  (async () => {
    const bgSprite: SpriteData = await buildBackgroundSprite(getIntermissionPath(gameData.intermission.id));
    drawSprite(ctx, bgSprite);
    for (const [idx, id] of gameData.intermission.animalIds.entries()) {
      const animalSprite: SpriteData = await buildSprite(getAnimalSpritePath(id), INTERMISSION_MAP[gameData.intermission.id]!.animals[idx]!);
      drawSprite(ctx, animalSprite);
    }
  })();
  return () => {};
}

export function drawBetting(ctx: CanvasRenderingContext2D, gameData: GameData): () => void  {
  scaleCanvasDevicePixelRatio(ctx);
  (async () => {
    const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
    drawSprite(ctx, bgSprite);
    const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
    drawSprite(ctx, layoutSprite);
    for (const [idx, id] of gameData.race.animalIds.entries()) {
      const animalSprite: SpriteData = await buildSprite(getAnimalSpritePath(id), TRACK_MAP[gameData.race.trackId]!.animals[idx]!);
      drawSprite(ctx, animalSprite);
    }
    const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goal);
    drawSprite(ctx, goalSprite);
  })();
  return () => {};
}

//////////////////////////////
// TEMP START OF RACE LOGIC //
//////////////////////////////
const BASE_SPEED = 2.5;

class CollisionMask {
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
  isSolid(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.mask[y * this.width + x] === 1;
  }
}

interface AnimalGameData extends SpriteData {
  id: string;
  angle: number;
}

function getDatafromImage(img: HTMLImageElement, size: number): ImageData {
  const offscreenLayout = document.createElement('canvas');
  offscreenLayout.width = size;
  offscreenLayout.height = size;
  const offscreenLayoutCtx = offscreenLayout.getContext('2d')!;
  offscreenLayoutCtx.clearRect(0, 0, size, size);
  offscreenLayoutCtx.drawImage(img, 0, 0, size, size);
  return offscreenLayoutCtx.getImageData(0, 0, size, size);
}

export function drawRace(ctx: CanvasRenderingContext2D, gameData: GameData) {
  setDefaultCanvasRatio(ctx);

  let animationFrameId: number | null = null;
  let running = true;
  // Unique setup id for this invocation
  const setupId = Symbol('raceSetup');
  (ctx.canvas as any).__raceSetupId = setupId;

  (async () => {
    try {
      const bgSprite: SpriteData = await buildBackgroundSprite(getTrackBackgroundPath(gameData.race.trackId));
      const layoutSprite: SpriteData = await buildBackgroundSprite(getTrackLayoutPath(gameData.race.trackId));
      const goalSprite: SpriteData = await buildSprite(getGoalPath(), TRACK_MAP[gameData.race.trackId]!.goal);
      const initialPositions = TRACK_MAP[gameData.race.trackId]!.animals.map(pos => ({ x: pos.pos.x, y: pos.pos.y }));
      const animals: AnimalGameData[] = await Promise.all(
        gameData.race.animalIds.map(async (id, idx) => {
          const sprite = await buildSprite(
            getAnimalSpritePath(id),
            {
              ...TRACK_MAP[gameData.race.trackId]!.animals[idx]!,
              pos: { x: initialPositions[idx]!.x, y: initialPositions[idx]!.y }
            }
          );
          return {
            ...sprite,
            id,
            angle: Math.random() * Math.PI * 2,
          };
        })
      );

      // If a new setup has started, abort this one
      if ((ctx.canvas as any).__raceSetupId !== setupId) return;

      const layoutData: ImageData = getDatafromImage(layoutSprite.img, layoutSprite.transform.size.w);
      const animalData: ImageData[] = animals.map(sprite => getDatafromImage(sprite.img, sprite.transform.size.w));
      const goalData: ImageData = getDatafromImage(goalSprite.img, GOAL_SIZE);

      const trackMask = new CollisionMask(layoutData, 128);
      const animalMasks: CollisionMask[] = animalData.map(data => new CollisionMask(data, 5));
      const goalMask = new CollisionMask(goalData, 5);

      function calcVelocity(angle: number, speed: number): {dx: number, dy: number} {
        return {
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
        };
      }

      function drawImage(image: HTMLImageElement, ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.drawImage(image, x, y, size, size);
      }

      function detectCollision(mask: CollisionMask, nx: number, ny: number, size: number): boolean {
        for (let cy = 0; cy < size; ++cy) {
          for (let cx = 0; cx < size; ++cx) {
            const px = Math.floor(nx + cx);
            const py = Math.floor(ny + cy);
            if (px < 0 || px >= BACKGROUND_SIZE || py < 0 || py >= BACKGROUND_SIZE) continue;
            if (!mask.isSolid(cx, cy)) continue;
            if (trackMask.isSolid(px, py)) {
              return true;
            }
          }
        }
        return false;
      }

      function getRandomVelocity(dx: number, dy: number): [number, number] {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.sqrt(dx * dx + dy * dy);
        return [Math.cos(angle) * speed, Math.sin(angle) * speed];
      }

      function getRandomAngle(): number {
        return Math.random() * Math.PI * 2;
      }

      function animate() {
        // Only animate if this is the current setup
        if (!running || (ctx.canvas as any).__raceSetupId !== setupId) return;
        ctx.clearRect(0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE);
        ctx.drawImage(bgSprite.img, 0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE, 0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE);
        ctx.drawImage(layoutSprite.img, 0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE, 0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE);
        for (let i = 0; i < animals.length; ++i) {
          const img = animals[i]!.img;
          const cords = animals[i]!.transform.pos;
          const angle = animals[i]!.angle;
          if (!img || !cords) continue;
          drawImage(img, ctx, cords.x, cords.y, ANIMAL_SIZE);

          let bounced = false;
          const velocity = calcVelocity(angle, BASE_SPEED);
          if (detectCollision(animalMasks[i]!, cords.x + velocity.dx, cords.y + velocity.dy, ANIMAL_SIZE)) {
            animals[i]!.angle = getRandomAngle();
            bounced = true;
          } else if (detectCollision(animalMasks[i]!, cords.x + velocity.dx, cords.y, ANIMAL_SIZE)) {
            animals[i]!.angle = getRandomAngle();
            bounced = true;
          } else if (detectCollision(animalMasks[i]!, cords.x, cords.y + velocity.dy, ANIMAL_SIZE)) {
            animals[i]!.angle = getRandomAngle();
            bounced = true;
          }
          if (cords.x < 0) { cords.x = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
          if (cords.y < 0) { cords.y = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
          if (cords.x + ANIMAL_SIZE > BACKGROUND_SIZE) { cords.x = BACKGROUND_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
          if (cords.y + ANIMAL_SIZE > BACKGROUND_SIZE) { cords.y = BACKGROUND_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
          if (!bounced) {
            cords.x += velocity.dx;
            cords.y += velocity.dy;
          }
        }
        animationFrameId = requestAnimationFrame(animate);
      }
      animate();

      // Cleanup function to stop animation and invalidate setup
      (ctx.canvas as any).__raceCleanup = () => {
        running = false;
        (ctx.canvas as any).__raceSetupId = null;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    } catch (err) {
      console.error('Image loading failed', err);
    }
  })();

  // Return cleanup function for caller to use
  return () => {
    running = false;
    if ((ctx.canvas as any).__raceCleanup) {
      (ctx.canvas as any).__raceCleanup();
    }
  };
}

////////////////////////////
// TEMP END OF RACE LOGIC //
////////////////////////////

export function drawResults(ctx: CanvasRenderingContext2D, gameData: GameData): () => void  {
  scaleCanvasDevicePixelRatio(ctx);
  (async () => {
    const bgSprite: SpriteData = await buildBackgroundSprite(getTrackResultsPath(gameData.race.trackId));
    drawSprite(ctx, bgSprite);
    const winnerSprite: SpriteData = await buildBackgroundSprite(getAnimalWinnerPath(gameData.race.winnerId || 'rat1'));
    drawSprite(ctx, winnerSprite);
  })();
  return () => {};
}