import { useEffect } from 'react';
import { useSaveState } from './hooks/useSaveState';
import { ThemeProvider } from 'styled-components';
import { useGameSocket, usePhaseTimer } from './hooks';
import { useGameStore } from './stores';
import { Chat, Bets, Header, ConnectionModal, CanvasRenderer} from './views';
import { animalRaceBetsTheme } from './styles';
import { Layout, Main, CenterBox, Timer } from './AnimalRaceBets.styles';
import { ConnectionStatus } from './types';
import { formatTimeMSS } from './services';

const AnimalRaceBets: React.FC = () => {
  useGameSocket();

  const { gameData, connectionInfo } = useGameStore();
  //useSaveState(gameData, connectionInfo);

  const localTimeRemaining: number = usePhaseTimer(gameData.phase.startTime, gameData.phase.durationMs);

  // let PhaseComponent = <div>Loading...</div>;
  // if (phase === 'intermission') PhaseComponent = <Intermission />;
  // else if (phase === 'betting') PhaseComponent = <Betting />;
  // else if (phase === 'race') PhaseComponent = <Race />;
  // else if (phase === 'results') PhaseComponent = <Results />;

  return (
    <ThemeProvider theme={animalRaceBetsTheme}>
      <Layout>
        <Header />
        <Main>
          <Bets />
          <CenterBox>
            <Timer>{formatTimeMSS(localTimeRemaining)}</Timer>
            <CanvasRenderer />
          </CenterBox>
          <Chat />
        </Main>
        {connectionInfo.status == ConnectionStatus.Disconnected && <ConnectionModal status={connectionInfo.status} />}
      </Layout>
    </ThemeProvider>
  );
};

export default AnimalRaceBets;