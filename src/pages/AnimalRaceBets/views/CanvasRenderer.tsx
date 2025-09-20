import { useRef, FC, RefObject } from 'react';
import { useResponsiveCanvasSize } from '../hooks';
import { GameCanvas } from './CanvasRenderer.styles';
import { useCanvasDraw } from '../hooks/useCanvasDraw';
import { useFrameGenerator } from '../hooks/useFrameGenerator';
import { SpriteData } from '@my-site/shared/animal-race-bets';

const CanvasRenderer: FC = () => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
  const canvasSize: number = useResponsiveCanvasSize(canvasRef);
  const frame: SpriteData[] = useFrameGenerator();
  useCanvasDraw(canvasRef, frame);

  return (
    <GameCanvas 
      ref={canvasRef} 
      style={{
        width: canvasSize,
        height: canvasSize,
      }}/>
  )
};

export default CanvasRenderer;