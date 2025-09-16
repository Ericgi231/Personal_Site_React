
import { AnimalInfo } from '@my-site/shared/animal-race-bets';

export function drawIntermissionScene(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  dpr: number,
  backgroundPath: string,
  animalInfo: AnimalInfo[]) 
{
  // Set canvas to physical pixel size for sharpness
  ctx.canvas.width = canvasSize * dpr;
  ctx.canvas.height = canvasSize * dpr;
  ctx.canvas.style.width = `${canvasSize}px`;
  ctx.canvas.style.height = `${canvasSize}px`;

  // Scale context so drawing uses logical coordinates
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Draw background image stretched
  const bgImg = new window.Image();
  bgImg.src = backgroundPath;
  bgImg.onload = () => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(bgImg, 0, 0, canvasSize, canvasSize);

    // Coordinate system: background 1920x1920, animal 96x96
    const BG_DESIGN_SIZE = 1920;
    const ANIMAL_SIZE = 96;
    const scale = canvasSize / BG_DESIGN_SIZE;

    animalInfo.forEach((animal: AnimalInfo) => {
      const pos = animal.positionInfo.position || { x: 0, y: 0 };
      const size = animal.positionInfo.size ?? 1;
      const flipped = animal.positionInfo.flipped ?? false;
      const animalImg = new window.Image();
      animalImg.src = animal.filePath;
      animalImg.onload = () => {
        const drawWidth = ANIMAL_SIZE * size * scale;
        const drawHeight = ANIMAL_SIZE * size * scale;
        const centerX = pos.x * scale;
        const centerY = pos.y * scale;
        ctx.save();
        ctx.translate(centerX, centerY);
        if (flipped) {
          ctx.scale(-1, 1);
        }
        ctx.drawImage(
          animalImg,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();
      };
    });
  };
}
