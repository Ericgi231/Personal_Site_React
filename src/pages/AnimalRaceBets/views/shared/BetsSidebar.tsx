import React from 'react';
import { useGameStore } from '../../stores';
import { BetsSidebarContainer } from './BetsSidebar.styles';

const BetsSidebar = () => {
  const { gameData } = useGameStore();
  return (
    <BetsSidebarContainer>
      <h3>Bets</h3>
      {gameData && <div>Current Bets: {gameData.bets?.length ?? 0}</div>}
    </BetsSidebarContainer>
  );
};

export default BetsSidebar;