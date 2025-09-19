import styled from 'styled-components';

export const GameCanvas = styled.canvas`
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	aspect-ratio: 1 / 1;
	display: block;
`;

export const GameCanvasContainer = styled.div`
	display: flex;
	flex: 1;
	min-height: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;