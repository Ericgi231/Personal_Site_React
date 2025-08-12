import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { flexCenter, flexColumn } from '/src/styles/Mixins'

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

export const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  padding: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const FileCard = styled.a`
  ${flexColumn}
  ${flexCenter}
  aspect-ratio: 1 / 1;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;
`

export const ImageSource = styled.img`
    width: 100%;
    height: 100%;
`

export const VideoBox = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    display: block;
    background: black;
    border: none;
`

export const VideoSource = styled.source`
    width: 100%;
    height: 100%;
`

export const StyledStack = styled(Stack)`
  align-items: center;
`;

export const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;