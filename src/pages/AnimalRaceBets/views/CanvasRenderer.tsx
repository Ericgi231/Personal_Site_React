import { useRef, FC, RefObject } from 'react';
import { useResponsiveCanvasSize } from '../hooks';
import { GameCanvas } from './CanvasRenderer.styles';
import { useCanvasFrameDraw } from '../hooks/useCanvasFrameDraw';
import { useAnimationBuilder } from '../hooks/useAnimationBuilder';
import { AnimationFrame, CanvasAnimation, GamePhase, SpriteData } from '@my-site/shared/animal-race-bets';
import { useAnimationFrameVendor } from '../hooks/useAnimationFrameVendor';
import { useAnimationSelector } from '../hooks/useAnimationSelector';

const CanvasRenderer: FC = () => {
  // make canvas
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
  // get responsive size of canvas
  const canvasSize: number = useResponsiveCanvasSize(canvasRef);
  // generate frames when data is available to do so
  const animations: Partial<Record<GamePhase, CanvasAnimation>> = useAnimationBuilder();
  // animation selector determines which animation to use
  const animation: CanvasAnimation | undefined = useAnimationSelector(animations);
  // animation vendor reads frames at correct time
  const frame: AnimationFrame = useAnimationFrameVendor(animation);
  // draw to canvas when frame changes
  useCanvasFrameDraw(canvasRef, frame);

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