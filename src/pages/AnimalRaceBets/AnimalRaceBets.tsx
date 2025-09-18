import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useGameSocket, usePhaseTimer } from './hooks';
import { useGameStore } from './stores';
import { Intermission, Betting, Race, Results, Chat, Bets, Header, ConnectionModal} from './views';
import { animalRaceBetsTheme } from './styles';
import { Layout, Main, CenterBox, Timer } from './AnimalRaceBets.styles';
import { ConnectionStatus } from './types';
import { formatTimeMSS } from './services';
import { GamePhase } from '@my-site/shared/animal-race-bets';

const AnimalRaceBets: React.FC = () => {
  useGameSocket();
  const { gameData, connectionInfo } = useGameStore();
  const phase: GamePhase = gameData.phase.name;
  const localTimeRemaining: number = usePhaseTimer(gameData.phase.startTime, gameData.phase.durationMs);

  useEffect(() => {
    if (gameData) {
      sessionStorage.setItem('animalRaceBetsGameData', JSON.stringify(gameData));
    }
  }, [gameData]);

  useEffect(() => {
    if (connectionInfo) {
      sessionStorage.setItem('animalRaceBetsConnectionInfo', JSON.stringify(connectionInfo));
    }
  }, [connectionInfo]);

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
            <Timer>{formatTimeMSS(localTimeRemaining)}</Timer>
            {PhaseComponent}
          </CenterBox>
          <Chat />
        </Main>
        {connectionInfo.status !== ConnectionStatus.Connected && <ConnectionModal status={connectionInfo.status} />}
      </Layout>
    </ThemeProvider>
  );
};

export default AnimalRaceBets;