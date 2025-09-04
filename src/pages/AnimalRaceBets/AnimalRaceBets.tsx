import { useEffect, useState } from "react";
import { Header, Info, GameContext } from "@pages/AnimalRaceBets/shared";
import { io, type Socket } from "socket.io-client";

// Direct imports instead of lazy loading
import { Intermission, Betting, Race, Results } from "@pages/AnimalRaceBets/components";

enum GameState {
  Intermission = "Intermission",
  Betting = "Betting",
  Race = "Race",
  Results = "Results",
}

enum ConnectionStatus {
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
}

// Direct component mapping instead of lazy components
const pageComponents = {
  [GameState.Intermission]: Intermission,
  [GameState.Betting]: Betting,
  [GameState.Race]: Race,
  [GameState.Results]: Results,
} as const;

const WS_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : `https://${window.location.hostname}`;

const AnimalRaceBets: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Connecting);
  const [gameState, setGameState] = useState<GameState>(GameState.Intermission);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameData, setGameData] = useState<any>(null);
  const [bettingData, setBettingData] = useState<any>(null);

  useEffect(() => {
    const socket = io(WS_URL);

    socket.on("state", (data: { state: GameState }) => {
      setGameState(data.state);
    });

    socket.on("connect", () => setConnectionStatus(ConnectionStatus.Connected));
    socket.on("disconnect", () => setConnectionStatus(ConnectionStatus.Disconnected));

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const Page = pageComponents[gameState];

  return (
    <>
      <Header />
      <GameContext.Provider value={{ socket, gameData, bettingData }}>
        <Page />
      </GameContext.Provider>
      <Info status={connectionStatus} />
    </>
  );
};

export default AnimalRaceBets;