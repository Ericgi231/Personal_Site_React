import styled from 'styled-components';

export const ConnectionModalContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  z-index: 1000;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  pointer-events: none;
  text-align: center;
`;
