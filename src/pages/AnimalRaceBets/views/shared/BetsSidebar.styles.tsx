import styled from 'styled-components';

export const BetsSidebarContainer = styled.aside`
  width: 15%;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-right: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
`;
