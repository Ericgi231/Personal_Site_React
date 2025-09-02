import { styled } from 'styled-components';
import { flexCenter, mobile, tablet } from '@styles/Mixins';
import { Realm, realmPattern } from './helper';

export const MORA_JAI_BACKGROUND = '#756365';
export const BOX_LIGHT_BROWN = '#442f31';
export const BOX_DARK_BROWN = '#2d1c1e';
export const BOX_TRIM = '#563013';
export const BOX_METAL = '#a67c52';

export const MoraJaiLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: ${MORA_JAI_BACKGROUND};
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

export const GridContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  min-height: 100vh;
  background: ${MORA_JAI_BACKGROUND};
  ${mobile`
    min-height: 100dvh;
    justify-content: center;
    align-items: center;
    padding-left: 4px;
    padding-right: 4px;
  `}
`;

export const AccessibleToggleButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 20;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast}, border ${({ theme }) => theme.transitions.fast};
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textDark};
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
  ${mobile`
    position: static;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    left: unset;
    top: unset;
    display: block;
  `}
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  width: 100%;
  ${tablet`
    gap: 16px;
  `}
  ${mobile`
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 16px;
  `}
`;

export const BoxTitle = styled.div`
  flex: 0 0 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 1.2em;
  color: ${({ theme }) => theme.colors.textDark};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 48px;
  ${mobile`
    font-size: 1rem;
    height: 38px;
  `}
`;

export const NavButton = styled.button`
  flex: 0 0 20%;
  height: 48px;
  padding: 0 12px;
  border-radius: 6px;
  border: 3px solid ${BOX_TRIM};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 16px;
  cursor: pointer;
  background: ${Realm.Grey};
  color: ${({ theme }) => theme.colors.textDark};
  transition: background ${({ theme }) => theme.transitions.base}, font-size ${({ theme }) => theme.transitions.base}, padding ${({ theme }) => theme.transitions.base};
  ${tablet`
    font-size: 1.05rem;
    padding: 0 8px;
    height: 42px;
  `}
  ${mobile`
    width: 100%;
    font-size: 1rem;
    padding: 0 6px;
    margin-right: 0;
    height: 38px;
  `}
`;

export const SolvedTracker = styled.div<{ $active?: boolean }>`
  flex: 1 1 45%;
  height: 48px;
  border-radius: 6px;
  border: 3px solid ${BOX_TRIM};
  font-size: 1.2rem;
  font-weight: bold;
  background: ${({ $active }) => $active ? Realm.Blue : Realm.Red};
  color: ${({ theme }) => theme.colors.textDark};
  transition: background ${({ theme }) => theme.transitions.base}, font-size ${({ theme }) => theme.transitions.base}, padding ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet`
    font-size: 1.05rem;
    padding: 0 8px;
    height: 42px;
  `}
  ${mobile`
    width: 100%;
    font-size: 1rem;
    padding: 0 6px;
    height: 38px;
  `}
`;

export const OuterBox = styled.div`
  background: ${BOX_DARK_BROWN};
  border: 6px solid ${BOX_TRIM};
  border-radius: 70px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  position: relative;
  width: 90vw;
  max-width: 700px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  padding: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile`
    width: 98vw;
    max-width: 98vw;
    border-radius: 30px;
    border-width: 3px;
  `}
`;

export const GridBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3%;
  width: 90%;
  height: 90%;
  border: 5px solid ${BOX_TRIM};
  border-radius: 12px;
  padding: 4%;
  background: ${BOX_LIGHT_BROWN};
`;

export const GridButton = styled.button<{ 
    $corner: 'tl' | 'tr' | 'bl' | 'br' | 'none'; 
    $pressed: boolean; 
    $realm: Realm;
    $accessible: boolean;}>`
  width: 100%;
  height: 100%;
  font-size: 2.2vw;
  border-radius: 1px;
  border: none;
  cursor: pointer;
  transition: box-shadow ${({ theme }) => theme.transitions.fast}, transform ${({ theme }) => theme.transitions.fast};
  ${({ $pressed }) =>
    $pressed
      ? `box-shadow: 0 1px 2px #0008 inset;
      transform: translateY(4px) scale(0.97);` 
      : `box-shadow: 0 4px 12px #0006, 0 1.5px 0 #fff4 inset;
      transform: none;`}
  ${({ $corner }) =>
    $corner === 'tl' ? 'clip-path: polygon(55px 0, 100% 0, 100% 100%, 0 100%, 0 55px);' :
    $corner === 'tr' ? 'clip-path: polygon(0 0, calc(100% - 55px) 0, 100% 55px, 100% 100%, 0 100%);' :
    $corner === 'bl' ? 'clip-path: polygon(0 0, 100% 0, 100% 100%, 55px 100%, 0 calc(100% - 55px));' :
    $corner === 'br' ? 'clip-path: polygon(0 0, 100% 0, 100% calc(100% - 55px), calc(100% - 55px) 100%, 0 100%);' :
    'clip-path: none;'}
  background: ${({ $realm }) => $realm};
  ${({ $accessible, $realm }) => $accessible ? realmPattern($realm, $realm, 0.5, false) : ""};
`;

export const CornerButton = styled.button<{ 
    $corner: 'tl' | 'tr' | 'bl' | 'br'; 
    $pressed: boolean; 
    $solved: boolean;
    $realm: Realm;
    $accessible: boolean;}>`
  position: absolute;
  width: 18%;
  height: 18%;
  border-radius: 50%;
  background: ${BOX_DARK_BROWN};
  border: 5px solid ${BOX_TRIM};
  margin: 2%;
  font-size: 1.1em;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  ${({ $corner }) =>
    $corner === 'tl' ? 'top: 0; left: 0;' :
    $corner === 'tr' ? 'top: 0; right: 0;' :
    $corner === 'bl' ? 'bottom: 0; left: 0;' :
    'bottom: 0; right: 0;'}
  ${({ $pressed }) =>
    $pressed
      ? `box-shadow: 0 1px 2px #0008 inset;
      transform: translateY(4px) scale(0.97);` 
      : `box-shadow: 0 4px 12px #0006, 0 1.5px 0 #fff4 inset;
      transform: none;`
  }
  ${({ $solved, $realm }) =>
    $solved
      ? realmPattern($realm, $realm, 0, true)
      : realmPattern($realm, Realm.Grey, 0, true)
  }
`;

export const MenuOuterBox = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin: 48px auto;
  padding: 2.5rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 80vw;
  max-width: 80%;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  position: relative;
  ${tablet`
    width: 95vw;
    padding: 1.5rem 0.5rem;
    margin: 24px auto;
    max-width: 100%;
  `}
  ${mobile`
    width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    margin: 0;
    padding: 1rem 0.25rem;
    max-width: 100%;
  `}
`;

export const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 1.5rem;
  margin: 0.75rem 0 1.5rem 0;
  width: 100%;
  ${tablet`
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0 1rem 0;
  `}
  ${mobile`
    grid-template-columns: repeat(1, 1fr);
    gap: 0.75rem;
    margin: 1rem 0 0.5rem 0;
  `}
`;

export const LevelSquare = styled.button<{ $solved?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  width: 100%;
  padding: 1rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ $solved }) => $solved ? Realm.Blue : ({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: border ${({ theme }) => theme.transitions.base}, background ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};
  &:hover, &:focus {
    border-color: ${Realm.Blue};
    background: ${Realm.Blue + 22};
    color: ${Realm.Blue};
    box-shadow: ${({ theme }) => theme.shadows.md};
    outline: none;
  }
  ${tablet`
    font-size: 1rem;
    padding: 0.75rem 0.25rem;
    min-height: 56px;
  `}
  ${mobile`
    font-size: 0.98rem;
    padding: 0.5rem 0.15rem;
    min-height: 48px;
  `}
`;

export const LocationSection = styled.section`
  width: 100%;
  margin-bottom: 2.5rem;
  padding: 0rem 1rem 0rem 1rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: background ${({ theme }) => theme.transitions.base};
  ${tablet`
    padding: 1rem 0.5rem;
  `}
  ${mobile`
    padding: 0.5rem 0.25rem;
    margin-bottom: 1.2rem;
  `}
`;

export const MenuTitle = styled.h1`
  margin-bottom: 0.5em;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${Realm.Blue};
  letter-spacing: 0.01em;
`;

export const MenuDescription = styled.p`
  margin-bottom: 1.5em;
  font-size: 1.1em;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const LocationHeader = styled.h2`
  margin: 10px 0 0 0;
  color: ${Realm.Blue};
  font-weight: 700;
  font-size: 1.3em;
  letter-spacing: 0.02em;
`;