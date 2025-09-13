import React, { useEffect, useState } from 'react';
import { useGameSocket } from './hooks';
import { useGameStore } from './stores';
import { Intermission, Betting, Race, Results, Chat, Bets, Header, ConnectionModal} from './views';
import { animalRaceBetsTheme } from './styles';
import { ThemeProvider } from 'styled-components';
import { Layout, Main, CenterBox, Timer } from './AnimalRaceBets.styles';
import { ConnectionStatus } from './types';

function getTimeRemaining(gameData: any) {
  if (!gameData) return 0;
  const start = new Date(gameData.startTime).getTime();
  const now = Date.now();
  const remaining = Math.max(0, (gameData.duration || 0) - (now - start));
  return Math.ceil(remaining / 1000);
}

const AnimalRaceBets: React.FC = () => {
  useGameSocket();
  const { gameData, connectionInfo } = useGameStore();
  const phase = gameData?.currentPhase;
  const [localTimeRemaining, setLocalTimeRemaining] = useState(getTimeRemaining(gameData));

  useEffect(() => {
    setLocalTimeRemaining(getTimeRemaining(gameData));
    if (!gameData) return;
    const interval = setInterval(() => {
      setLocalTimeRemaining(prev => {
        const newTime = getTimeRemaining(gameData);
        return newTime;
      });
    }, 1000);

    sessionStorage.setItem('animalRaceBetsGameData', JSON.stringify(gameData));

    return () => clearInterval(interval);
  }, [gameData]);

  let PhaseComponent = <div>Loading...</div>;
  if (phase === 'intermission') PhaseComponent = <Intermission />;
  else if (phase === 'betting') PhaseComponent = <Betting />;
  else if (phase === 'race') PhaseComponent = <Race />;
  else if (phase === 'results') PhaseComponent = <Results />;

  return (
    <ThemeProvider theme={animalRaceBetsTheme}>
      <Layout>
        <Header />
        <Main>
          <Bets />
          <CenterBox>
            <Timer>Time Remaining: {localTimeRemaining}s</Timer>
            {PhaseComponent}
          </CenterBox>
          <Chat />
        </Main>
        {connectionInfo?.status !== ConnectionStatus.Connected && <ConnectionModal status={connectionInfo?.status!} />}
      </Layout>
    </ThemeProvider>
  );
};

export default AnimalRaceBets;