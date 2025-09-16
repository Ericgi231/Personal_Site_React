import styled from 'styled-components';

// Layout: full viewport, column for header + main
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

// Main: row for sidebars and center
export const Main = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  position: relative;
`;

// CenterBox: center content, relative for Timer
export const CenterBox = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
`;

// Timer: visually attached below header, square top, rounded bottom
export const Timer = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 12px 6px 12px;
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0 0  ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 500;
`;
