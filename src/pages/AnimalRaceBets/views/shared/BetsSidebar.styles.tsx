import styled from 'styled-components';

import { mobile } from '@styles/Mixins';

export const BetsSidebarContainer = styled.aside`
  width: 15%;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-right: 2px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;

  ${mobile`
    display: none;
  `}
`;
