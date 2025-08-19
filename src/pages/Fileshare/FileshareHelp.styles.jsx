import styled from "styled-components";

export const HelpContainer = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const ApiCard = styled.section`
  background: ${props => props.theme.colors.card};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  margin-bottom: 2.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
`;

export const ApiHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textDark};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: -2rem -1.5rem 1.5rem -1.5rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const SectionText = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: ${props => props.theme.spacing.xs};
  display: block;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.base};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: left;
  background: ${props => props.theme.colors.background};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const TableCell = styled.td`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`;

export const ExampleBox = styled.pre`
  background: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.textDark};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.base};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.xs} 0 ${props => props.theme.spacing.md} 0;
  font-size: ${props => props.theme.fontSizes.base};
  overflow-x: auto;
  display: block;
  width: fit-content;
  max-width: 100%;
  font-family: ${props => props.theme.fonts.mono};
`;