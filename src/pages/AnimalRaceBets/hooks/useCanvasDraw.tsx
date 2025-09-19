import { useEffect } from 'react';
import { phaseRenderers } from '../services/drawingService';
import { useGameStore } from '../stores';

export function useCanvasDraw(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const { gameData } = useGameStore();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    return phaseRenderers[gameData.phase.name](ctx, gameData);
  }, [gameData, canvasRef]);
}