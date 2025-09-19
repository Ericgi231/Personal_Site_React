import { useRef, FC, RefObject } from 'react';
import { useResponsiveCanvasSize } from '../hooks';
import { GameCanvas, GameCanvasContainer } from './CanvasRenderer.styles';
import { useCanvasDraw } from '../hooks/useCanvasDraw';

const CanvasRenderer: FC = () => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
  const canvasSize: number = useResponsiveCanvasSize(canvasRef);
  useCanvasDraw(canvasRef);

  return (
    <GameCanvasContainer>
      <GameCanvas 
        ref={canvasRef} 
        style={{
          width: canvasSize,
          height: canvasSize,
        }}/>
    </GameCanvasContainer>
  )
};

export default CanvasRenderer;