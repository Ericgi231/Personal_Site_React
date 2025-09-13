import { GamePhase } from '@shared/animal-race-bets';
import { useGameStore } from '../../stores';
import { HeaderContainer, HeaderText } from './Header.styles';

const PHASE_HEADER_MESSAGES: Record<GamePhase, string> = {
  [GamePhase.Intermission]: "Intermission",
  [GamePhase.Betting]: "Place your bets",
  [GamePhase.Race]: "And they're off",
  [GamePhase.Results]: "The winner is..."
};

const Header: React.FC = () => {
  const { gameData } = useGameStore();
  return (
    <HeaderContainer>
      <HeaderText>{gameData && gameData.currentPhase && PHASE_HEADER_MESSAGES[gameData.currentPhase]}</HeaderText>
    </HeaderContainer>
  );
};

export default Header;