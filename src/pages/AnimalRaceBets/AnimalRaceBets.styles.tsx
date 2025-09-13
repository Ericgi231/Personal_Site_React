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
  width: 100%;
  position: relative;
`;

// CenterBox: center content, relative for Timer
export const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-width: 0;
  min-height: 0;
  background: ${({ theme }) => theme.colors.background};
`;

// Timer: visually attached below header, square top, rounded bottom
export const Timer = styled.div`
  margin-top: -8px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  align-self: center;
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 500;
`;
