import { styled } from 'styled-components';
import { flexCenter } from '@styles/Mixins.js';

export const GridContainer = styled.div`
  ${flexCenter}
  min-height: 100vh;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  border: 3px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 24px;
  background: ${props => props.theme.colors.background};
`;

export const GridButton = styled.button`
  width: 150px;
  height: 150px;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;