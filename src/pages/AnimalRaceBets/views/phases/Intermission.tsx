// import React, { useRef } from 'react';

// import { useGameStore } from '../../stores';
// import { IntermissionContainer, IntermissionCanvas } from './Intermission.styles';
// import { useResponsiveCanvasSize } from '../../hooks/useResponsiveCanvasSize';
// import { useIntermissionCanvasDraw } from '../../hooks';

// const Intermission: React.FC = () => {
//   const { id, animalIds } = useGameStore().gameData.intermission;

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const canvasSize = useResponsiveCanvasSize(canvasRef.current);
//   useIntermissionCanvasDraw(canvasRef.current!, canvasSize, id, animalIds);

//   return (
//     <IntermissionContainer>
//       <IntermissionCanvas
//         ref={canvasRef}
//         style={{
//           width: canvasSize,
//           height: canvasSize,
//         }}
//       />
//     </IntermissionContainer>
//   );
// };

export default () => null;