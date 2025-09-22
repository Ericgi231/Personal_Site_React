import { useEffect } from 'react';
import { drawFrame } from '../services/canvasFrameDrawService';
import { AnimationFrame } from '@my-site/shared/animal-race-bets';

export function useCanvasFrameDraw(canvasRef: React.RefObject<HTMLCanvasElement | null>, frame: AnimationFrame) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawFrame(ctx, frame);
  }, [canvasRef, frame]);
}