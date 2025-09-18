import { useEffect } from 'react';
import { drawIntermissionScene } from '../services/canvasService';
import { getIntermissionPath, getAnimalSpritePath } from '../constants';
import { AnimalInfo, INTERMISSION_MAP } from '@my-site/shared/animal-race-bets';

export function useIntermissionCanvasDraw(canvas: HTMLCanvasElement, canvasSize: number, intermissionId: string, animalIds: string[]) {
  useEffect(() => {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const backgroundPath = getIntermissionPath(intermissionId);
    const intermission = INTERMISSION_MAP[intermissionId];
    const animalInfo: AnimalInfo[] = animalIds.map((id, idx) => ({
      filePath: getAnimalSpritePath(id),
      positionInfo: intermission!.animalPositions[idx]!
    }));
    drawIntermissionScene(
        ctx,
        canvasSize,
        dpr,
        backgroundPath,
        animalInfo);
  }, [intermissionId, animalIds, canvasSize, canvas]);
}