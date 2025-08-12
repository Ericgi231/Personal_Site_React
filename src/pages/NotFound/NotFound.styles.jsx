import styled from 'styled-components'
import { flexCenter, flexColumn } from '/src/styles/Mixins'

export const NotFoundContainer = styled.div`
  ${flexColumn}
  ${flexCenter}
  min-height: calc(100vh - 120px);
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`

export const ErrorCode = styled.h1`
  font-size: ${props => props.theme.fontSizes['7xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes['6xl']};
  }
`

export const ErrorMessage = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.text};
  margin: ${props => props.theme.spacing.md} 0;
`

export const ErrorDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 500px;
`

export const HomeButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`