import { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";

const Container = styled.div<{ w: number; h: number }>`
  position: relative;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  margin: 5vh auto;
  background: #23272e;
  border-radius: 2rem;
  overflow: hidden;
`;

const MovingBox = styled.div<{ color: string; x: number; y: number; size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 1rem;
  box-shadow: 0 2px 8px #0004;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  user-select: none;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

type Box = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
};

const AnimalRaceBets = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [container, setContainer] = useState({ w: 800, h: 600 });
  const [boxSize, setBoxSize] = useState(80);

  // Poll the backend for box data
  useEffect(() => {
    let running = true;
    const fetchBoxes = async () => {
      while (running) {
        try {
          const res = await fetch("/node-api/boxes");
          const data = await res.json();
          setBoxes(data.boxes);
          setContainer(data.containerSize);
          setBoxSize(data.boxSize);
        } catch {}
        await new Promise(r => setTimeout(r, 100));
      }
    };
    fetchBoxes();
    return () => { running = false; };
  }, []);

  return (
    <Container w={container.w} h={container.h}>
      {boxes.map((b, i) => (
        <MovingBox
          key={i}
          color={b.color}
          x={b.x}
          y={b.y}
          size={boxSize}
        >
          {i + 1}
        </MovingBox>
      ))}
    </Container>
  );
}

export default AnimalRaceBets;