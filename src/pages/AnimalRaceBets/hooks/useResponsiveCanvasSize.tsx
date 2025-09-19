import { useState, useEffect, RefObject } from 'react';
export function useResponsiveCanvasSize(canvasRef: RefObject<HTMLCanvasElement | null> ) {
  const [canvasSize, setCanvasSize] = useState(0);
  useEffect(() => {
    function handleResize() {
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      setCanvasSize(Math.min(container.offsetWidth, container.offsetHeight));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef]);
  return canvasSize;
}