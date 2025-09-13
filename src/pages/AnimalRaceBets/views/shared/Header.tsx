import React from 'react';
import { useGameStore } from '../../stores';
import { HeaderContainer } from './Header.styles';

const Header = () => {
  const { gameData } = useGameStore();
  return (
    <HeaderContainer>
      <h2>Animal Race Bets</h2>
      {gameData && <span style={{ marginLeft: 24 }}>Current Phase: {gameData.currentPhase}</span>}
    </HeaderContainer>
  );
};

export default Header;