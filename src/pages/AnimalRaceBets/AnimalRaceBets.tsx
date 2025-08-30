import { lazy, useEffect, useState, Suspense, type ReactNode, type LazyExoticComponent, type ComponentType } from "react";
import { Header, Info, GameContext } from "@pages/AnimalRaceBets/shared";
import { io, type Socket } from "socket.io-client";

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

const lazyPage = (name: GameState): LazyExoticComponent<ComponentType<any>> =>
  lazy(() =>
    import("@pages/AnimalRaceBets/index.js").then((mod) => ({
      default: mod[name as keyof typeof mod] as ComponentType<any>,
    }))
  );

const pageComponents = Object.fromEntries(
  Object.values(GameState).map((state) => [state, lazyPage(state as GameState)])
) as Record<GameState, LazyExoticComponent<ComponentType<any>>>;

const WS_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : `http://${window.location.hostname}:3001`;

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

    return () => {
      socket.disconnect();
    };
  }, []);

  const Page = pageComponents[gameState];
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading page...</div>}>
        <GameContext.Provider value={{ socket, gameData, bettingData }}>
          <Page />
        </GameContext.Provider>
      </Suspense>
      <Info status={connectionStatus} />
    </>
  );
};

export default AnimalRaceBets;