import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { flexCenter, flexColumn } from '/src/styles/Mixins'

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;

    & > * {
      min-width: 0;
      width: 100%;
    }
  }
`

export const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  margin: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs} 
      ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};

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
    filter: ${({ $blur }) => $blur ? 'blur(30px)' : 'none'};
`

export const VideoBox = styled.video`
    width: 100%;
    height: 100%;
    display: block;
    background: black;
    filter: ${({ $blur }) => $blur ? 'blur(30px)' : 'none'};
`

export const AudioBox = styled.audio`
    width: 100%;
    height: 100%;
    display: block;
    background: black;
`

export const VideoSource = styled.source`
    width: 100%;
    height: 100%;
`

export const StyledStack = styled(Stack)`
  align-items: center;
  ${({ $top, theme }) =>
    $top &&
    `
      @media (min-width: ${theme.breakpoints.sm}) {
        display: none !important;
      }
    `
  }
`;

export const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileUploadButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-right: ${props => props.theme.spacing.sm};
`;

export const SearchInput = styled.input`
  flex: 1;
  margin-right: ${props => props.theme.spacing.sm};
`;

export const ControlBarDivider = styled.div`
  width: 2px;
  height: 32px;
  background: black;
  margin: 0 16px;
  border-radius: 1px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

export const ControlCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 1rem;
  cursor: pointer;

  input[type="checkbox"] {
    margin-right: 4px;
    accent-color: #d32f2f; /* Optional: red accent for NSFW */
  }
`;