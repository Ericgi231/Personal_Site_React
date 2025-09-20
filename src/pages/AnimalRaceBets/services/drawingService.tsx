
import { BACKGROUND_SIZE, SpriteData, TransformInfo } from '@my-site/shared/animal-race-bets';
import { getCachedImage } from './imageLoadingService';

function scaleCanvasDevicePixelRatio(ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  ctx.canvas.width = BACKGROUND_SIZE * dpr;
  ctx.canvas.height = BACKGROUND_SIZE * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export async function buildSprite(filePath: string, transform: TransformInfo) : Promise<SpriteData> 
{
  if (!transform.size) {
    transform.size = {w:96, h:96};
  }
  return {
    img: await getCachedImage(filePath),
    transform
  }
}

export function buildBackgroundSprite(filePath: string): Promise<SpriteData> {
  return buildSprite(filePath, {
    coordinates: {x:BACKGROUND_SIZE/2, y:BACKGROUND_SIZE/2},
    size: {w:BACKGROUND_SIZE, h:BACKGROUND_SIZE}
  });
}

function drawSprite(ctx: CanvasRenderingContext2D, sprite: SpriteData) {
  const { img, transform } = sprite;
  const { coordinates, size, flipped } = transform;
  ctx.save();
  ctx.translate(coordinates.x, coordinates.y);
  if (flipped) ctx.scale(-1, 1);
  ctx.drawImage(img, -size!.w / 2, -size!.h / 2, size!.w, size!.h);
  ctx.restore();
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: SpriteData[]) {
  scaleCanvasDevicePixelRatio(ctx);
  ctx.clearRect(0, 0, BACKGROUND_SIZE, BACKGROUND_SIZE);
  for (const sprite of frame) {
    drawSprite(ctx, sprite);
  }
}