import { useRef, FC, RefObject } from 'react';
import { useResponsiveCanvasSize } from '../hooks';
import { GameCanvas } from './CanvasRenderer.styles';
import { useCanvasFrameDraw } from '../hooks/useCanvasFrameDraw';
import { useAnimationBuilder } from '../hooks/useAnimationBuilder';
import { AnimationFrame, CanvasAnimation, GamePhase } from '@my-site/shared/animal-race-bets';
import { useAnimationFrameVendor } from '../hooks/useAnimationFrameVendor';
import { useAnimationSelector } from '../hooks/useAnimationSelector';

const CanvasRenderer: FC = () => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
  const canvasSize: number = useResponsiveCanvasSize(canvasRef);
  const animations: Partial<Record<GamePhase, CanvasAnimation>> = useAnimationBuilder();
  const animation: CanvasAnimation | undefined = useAnimationSelector(animations);
  const isLoading = !animation || !animation.frames || animation.frames.length === 0;
  const loadingAnimation = animations[GamePhase.Loading];
  const frame: AnimationFrame = useAnimationFrameVendor(isLoading ? loadingAnimation : animation);
  useCanvasFrameDraw(canvasRef, frame);

  return (
    <GameCanvas 
      ref={canvasRef} 
      style={{
        width: canvasSize,
        height: canvasSize,
      }}/>
  );
};

export default CanvasRenderer;