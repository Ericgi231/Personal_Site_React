import React, { useRef, useEffect } from 'react';
import { RaceCanvas, RaceContainer } from './Race.styles';
import { useResponsiveCanvasSize } from '../../hooks';
import { useGameStore } from '../../stores';
import { getTrackLayoutPath } from '../../constants';
import { getAnimalSpritePath, getTrackBackgroundPath, TRACK_MAP, TrackData } from '@my-site/shared/animal-race-bets';

const ANIMAL_SIZE = 96;
const DESIGN_SIZE = 1920;
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

interface AnimalPosition {
  id: string;
  coordinates: { x: number; y: number };
  angle: number; // in radians
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

// Promise-based image loader
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

const Race: React.FC = () => {
  const { trackId, animalIds } = useGameStore().gameData.race;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = useResponsiveCanvasSize(canvasRef.current); // This will be used for CSS only
  const trackData: TrackData = TRACK_MAP[trackId!]!;
  const trackLayoutPath: string = getTrackLayoutPath(trackId!);
  const trackBackgroundPath: string = getTrackBackgroundPath(trackId!);
  const animalSpawnPositions: Array<{x: number, y:number}> = trackData.animalPositions;
  const animalSpritePaths: string[] = animalIds!.map(id => getAnimalSpritePath(id));
  const goalPosition: {x: number, y:number} = trackData.goalPosition;
  const goalSpritePath: string = '/assets/animal-race-bets/objects/goal.png';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = DESIGN_SIZE;
    canvas.height = DESIGN_SIZE;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    let animationFrameId: number | null = null;
    let running = true;

    (async () => {
      try {
        const backgroundImg: HTMLImageElement = await loadImage(trackBackgroundPath);
        
        const layoutImage: HTMLImageElement = await loadImage(trackLayoutPath);
        const layoutData: ImageData = getDatafromImage(layoutImage, DESIGN_SIZE);
        const trackMask = new CollisionMask(layoutData, 128);

        const animalImages: HTMLImageElement[] = await Promise.all(animalSpritePaths.map(p => loadImage(p)));
        const animalData: ImageData[] = animalImages.map(img => getDatafromImage(img, ANIMAL_SIZE));
        const animalMasks: CollisionMask[] = animalData.map(data => new CollisionMask(data, 5));

        const goalImage: HTMLImageElement = await loadImage(goalSpritePath);
        const goalData: ImageData = getDatafromImage(goalImage, ANIMAL_SIZE);
        const goalMask = new CollisionMask(goalData, 5);

        const animalPositions: AnimalPosition[] = animalIds!.map((id, idx) => ({
          id,
          coordinates: { x: animalSpawnPositions[idx]!.x, y: animalSpawnPositions[idx]!.y },
          angle: Math.random() * Math.PI * 2,
        }));

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
              if (px < 0 || px >= DESIGN_SIZE || py < 0 || py >= DESIGN_SIZE) continue;
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
          if (!running) return;
          ctx.clearRect(0, 0, DESIGN_SIZE, DESIGN_SIZE);
          ctx.drawImage(backgroundImg, 0, 0, DESIGN_SIZE, DESIGN_SIZE, 0, 0, DESIGN_SIZE, DESIGN_SIZE);
          ctx.drawImage(layoutImage, 0, 0, DESIGN_SIZE, DESIGN_SIZE, 0, 0, DESIGN_SIZE, DESIGN_SIZE);
          for (let i = 0; i < animalPositions.length; ++i) {
            const img = animalImages[i];
            const cords = animalPositions[i]!.coordinates;
            const angle = animalPositions[i]!.angle;
            if (!img || !cords) continue;
            drawImage(img, ctx, cords.x, cords.y, ANIMAL_SIZE);

            let bounced = false;
            const velocity = calcVelocity(angle, BASE_SPEED);
            if (detectCollision(animalMasks[i]!, cords.x + velocity.dx, cords.y + velocity.dy, ANIMAL_SIZE)) {
              animalPositions[i]!.angle = getRandomAngle();
              bounced = true;
            } else if (detectCollision(animalMasks[i]!, cords.x + velocity.dx, cords.y, ANIMAL_SIZE)) {
              animalPositions[i]!.angle = getRandomAngle();
              bounced = true;
            } else if (detectCollision(animalMasks[i]!, cords.x, cords.y + velocity.dy, ANIMAL_SIZE)) {
              animalPositions[i]!.angle = getRandomAngle();
              bounced = true;
            }
            if (cords.x < 0) { cords.x = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
            if (cords.y < 0) { cords.y = 0; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
            if (cords.x + ANIMAL_SIZE > DESIGN_SIZE) { cords.x = DESIGN_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
            if (cords.y + ANIMAL_SIZE > DESIGN_SIZE) { cords.y = DESIGN_SIZE - ANIMAL_SIZE; [velocity.dx, velocity.dy] = getRandomVelocity(velocity.dx, velocity.dy); bounced = true; }
            if (!bounced) {
              cords.x += velocity.dx;
              cords.y += velocity.dy;
            }
          }
          animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        // Cleanup on unmount
        // Only stop animation for this instance
        // Remove logs and animation when not running
        const cleanup = () => {
          running = false;
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
        };
        // Attach cleanup to window for debugging (optional)
        // window.__raceCleanup = cleanup;
        // Save cleanup to ref for useEffect return
        (canvas as any).__raceCleanup = cleanup;
      } catch (err) {
        console.error('Image loading failed', err);
      }
    })();

    return () => {
      running = false;
      if (canvas && (canvas as any).__raceCleanup) {
        (canvas as any).__raceCleanup();
      }
    };
  }, [canvasSize, trackLayoutPath]);

  return (
    <RaceContainer>
      <RaceCanvas
        ref={canvasRef}
        width={DESIGN_SIZE}
        height={DESIGN_SIZE}
      />
    </RaceContainer>
  );
};

export default Race;