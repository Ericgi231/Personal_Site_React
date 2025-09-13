import styled from 'styled-components';

export const ChatSidebarContainer = styled.aside`
  width: 15%;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100vh;
`;
