import { useState, useEffect } from 'react';
export function useResponsiveCanvasSize(canvas: HTMLCanvasElement | null) {
  const [canvasSize, setCanvasSize] = useState(0);
  useEffect(() => {
    function handleResize() {
      const container = canvas?.parentElement;
      if (!container) return;
      setCanvasSize(Math.min(container.offsetWidth, container.offsetHeight));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvas]);
  return canvasSize;
}