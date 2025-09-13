import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  height: 64px;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderText = styled.h2`
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.sm} 0;
`;