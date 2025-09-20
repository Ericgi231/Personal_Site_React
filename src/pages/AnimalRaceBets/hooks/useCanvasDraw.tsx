import { useEffect } from 'react';
import { drawFrame } from '../services/drawingService';
import { SpriteData } from '@my-site/shared/animal-race-bets';

export function useCanvasDraw(canvasRef: React.RefObject<HTMLCanvasElement | null>, frame: SpriteData[]) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawFrame(ctx, frame);
  }, [canvasRef, frame]);
}