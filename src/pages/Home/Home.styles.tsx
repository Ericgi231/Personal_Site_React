import { styled } from 'styled-components'
import { flexCenter, flexColumn } from '@styles/Mixins.js'

export const HomeContainer = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: top;
  min-height: calc(100vh - 120px);
  padding: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.lg};
`

export const Name = styled.h1`
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
`

export const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textLight};
  max-width: 80%;
  text-align: center;
  margin: 0;
`

export const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.md} 0;
`

export const SocialIcon = styled.a`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
`

export const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  max-width: 80%;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const NavigationBox = styled.a`
  ${flexCenter}
  flex-direction: column; 
  text-align: center;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  min-height: 120px;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.card};
  text-decoration: none;
  transition: ${props => props.theme.transitions.base};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}10;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`