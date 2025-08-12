import styled from 'styled-components'
import { flexBetween } from '/src/styles/Mixins'

export const Bar = styled.header`
  ${flexBetween}
  width: 100%;
  height: 30px;
  background-color: #fafafa;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 ${props => props.theme.spacing.lg};
  position: static;
  top: 0;
  z-index: ${props => props.theme.zIndex.sticky};
`