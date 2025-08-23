import { styled } from 'styled-components';
import { flexCenter } from '@styles/Mixins.js';
import { Realm } from '@pages/MoraJai/MoraJai.helper.js';

export const GridContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  min-height: 100vh;
  background: #312829;
`;

export const ControlBar = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NavButton = styled.button`
  height: 48px;
  width: 160px;
  flex-shrink: 0;
  padding: 0 32px;
  border: 5px solid #563013;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 16px;
  cursor: pointer;
  color: #fff;
  background: ${Realm.Grey};
  transition: background 0.2s;
  box-shadow: 0 2px 8px #0002;
`;

export const SolvedTracker = styled.div<{ $active?: boolean }>`
  height: 48px;
  min-width: 140px;
  padding: 0 32px;
  border: 5px solid #563013;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 16px;
  background: ${({ $active }) => $active ? Realm.Blue : Realm.Red};
  color: #fff;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const OuterBox = styled.div`
  color: ${props => props.theme.colors.textDark};
  display: inline-block;
  padding: 48px;
  border: 6px solid #a67c52;
  border-radius: 24px;
  background: #2d1c1e;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  position: relative;
`;

export const GridBoxWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  border: 5px solid #563013;
  border-radius: 12px;
  padding: 24px;
  background: #442f31;
`;

export const GridButton = styled.button<{ $corner: 'tl' | 'tr' | 'bl' | 'br' | 'none'; $pressed?: boolean }>`
  width: 150px;
  height: 150px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
  ${({ $pressed }) =>
    $pressed
      ? `box-shadow: 0 1px 2px #0008 inset;
      transform: translateY(4px) scale(0.97);` 
      : `box-shadow: 0 4px 12px #0006, 0 1.5px 0 #fff4 inset;
      transform: none;`
  }

  ${({ $corner }) =>
    $corner === 'tl' ? 'clip-path: polygon(55px 0, 100% 0, 100% 100%, 0 100%, 0 55px);' :
    $corner === 'tr' ? 'clip-path: polygon(0 0, calc(100% - 55px) 0, 100% 55px, 100% 100%, 0 100%);' :
    $corner === 'bl' ? 'clip-path: polygon(0 0, 100% 0, 100% 100%, 55px 100%, 0 calc(100% - 55px));' :
    $corner === 'br' ? 'clip-path: polygon(0 0, 100% 0, 100% calc(100% - 55px), calc(100% - 55px) 100%, 0 100%);' :
    'clip-path: none;'}
`;

export const CornerButton = styled.button<{ $corner: 'tl' | 'tr' | 'bl' | 'br'; $pressed?: boolean; $solved: boolean }>`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #563013;
  background: #2E2926;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  ${({ $corner }) =>
    $corner === 'tl' ? 'top: -40px; left: -40px;' :
    $corner === 'tr' ? 'top: -40px; right: -40px;' :
    $corner === 'bl' ? 'bottom: -40px; left: -40px;' :
    'bottom: -40px; right: -40px;'}

  ${({ $pressed }) =>
    $pressed
      ? `box-shadow: 0 1px 2px #0008 inset;
      transform: translateY(4px) scale(0.97);` 
      : `box-shadow: 0 4px 12px #0006, 0 1.5px 0 #fff4 inset;
      transform: none;`
  }
  
  ${({ $solved }) =>
    !$solved
      ? `filter: saturate(0.55);`
      : `filter: saturate(1.55);`
  }
`;

export const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 110px);
  gap: 15px;
  margin: 40px 0;
  justify-content: center;
`;

export const LevelSquare = styled.button`
  width: 110px;
  height: 110px;
  border-radius: 18px;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
  outline: none;
  border: 3px solid #3a2b22;
  color: #2d1c1e;
  box-shadow: 0 4px 16px #0002, 0 1.5px 0 #fff4 inset;
  transition: border 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover, &:focus {
    border-color: #1E71BF;
    color: #1E71BF;
    box-shadow: 0 6px 24px #1e71bf33, 0 1.5px 0 #fff4 inset;
  }
`;