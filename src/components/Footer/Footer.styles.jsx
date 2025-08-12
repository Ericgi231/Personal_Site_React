import styled from 'styled-components'
import { flexCenter } from '/src/styles/Mixins'

export const Bar = styled.footer`
  ${flexCenter}
  width: 100%;
  height: 30px;
  background-color: #fafafa;
  border-top: 1px solid ${props => props.theme.colors.border};
  position: static;
  bottom: 0;
  left: 0;
`