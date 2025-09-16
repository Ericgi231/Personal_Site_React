import styled from 'styled-components';

import { mobile } from '@styles/Mixins';

export const ChatSidebarContainer = styled.aside`
  width: 15%;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100vh;

  ${mobile`
    display: none;
  `}
`;
