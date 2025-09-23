import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { AppState, useGameStore } from '../stores';
import { handleConnectionInfo } from '../services';
import { ConnectionStatus } from '../types';
import { IntermissionUpdatePayload, GameData, PhaseInfo, SOCKET_EVENT_BETTING_UPDATE, SOCKET_EVENT_FULL_UPDATE, SOCKET_EVENT_INTERMISSION_UPDATE, SOCKET_EVENT_PHASE_UPDATE, SOCKET_EVENT_RACE_UPDATE, SOCKET_EVENT_USER_UPDATE, UserData, RaceUpdatePayload, BettingUpdatePayload, PhaseUpdatePayload, UserUpdatePayload, FullUpdatePayload } from '@my-site/shared/animal-race-bets';

const WS_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3001"
  : `https://${window.location.hostname}`;

export const useGameSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log('Connecting to WebSocket:', WS_URL);
    
    socketRef.current = io(WS_URL, {
      path: '/node-api/animal-race-bets/socket.io/',
      transports: ['polling', 'websocket'],
      timeout: 20000,
      forceNew: true,
      upgrade: true,
      rememberUpgrade: false,
    });

    const socket: Socket = socketRef.current;
    const store: AppState = useGameStore.getState();

    socket.on(SOCKET_EVENT_FULL_UPDATE, ( payload: FullUpdatePayload ) => {
      console.log('Received game data:', payload.gameData);
      store.setGameData(payload.gameData);
    });

    socket.on(SOCKET_EVENT_INTERMISSION_UPDATE, ( payload: IntermissionUpdatePayload ) => {
      console.log('Received new phase info:', payload.phaseInfo);
      console.log('Received new race info:', payload.raceInfo);
      store.setRaceInfo(payload.raceInfo);
      store.setPhaseInfo(payload.phaseInfo);
    });

    socket.on(SOCKET_EVENT_BETTING_UPDATE, ( payload: BettingUpdatePayload ) => {
      console.log('Received new phase info:', payload.phaseInfo);
      console.log('Received new intermission info:', payload.intermissionInfo);
      store.setIntermissionInfo(payload.intermissionInfo);
      store.setPhaseInfo(payload.phaseInfo);
    });

    socket.on(SOCKET_EVENT_RACE_UPDATE, ( payload: RaceUpdatePayload ) => {
      console.log('Received new phase info:', payload.phaseInfo);
      console.log('Received new winnerid:', payload.winnerId);
      store.setWinner(payload.winnerId);
      store.setPhaseInfo(payload.phaseInfo);
    });

    socket.on(SOCKET_EVENT_PHASE_UPDATE, ( payload: PhaseUpdatePayload ) => {
      console.log('Received new phase info:', payload.phaseInfo);
      store.setPhaseInfo(payload.phaseInfo);
    });

    socket.on(SOCKET_EVENT_USER_UPDATE, ( payload: UserUpdatePayload ) => {
      console.log('Received user data:', payload.userData);
      store.setUserData(payload.userData);
    });

    socket.on('connect', () => {
      console.log('Connected to AnimalRaceBets server via proxy');
      console.log('Connected via path:', socket.io.opts.path);
      console.log('Full Socket.IO URL:', `${WS_URL}/node-api/animal-race-bets/socket.io/`);
      console.log('Transport:', socket.io.engine.transport.name);
      handleConnectionInfo(store, socket, ConnectionStatus.Connected, null);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from AnimalRaceBets server. Reason:', reason);
      handleConnectionInfo(store, socket, ConnectionStatus.Disconnected, reason);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection failed for path:', `${WS_URL}/node-api/animal-race-bets/socket.io/`);
      console.error('Error:', error);
      handleConnectionInfo(store, socket, ConnectionStatus.Disconnected, error?.message || 'Unknown error');
    });

    return () => {
      console.log('Cleaning up socket connection');
      socket.disconnect();
    };
  }, []);
};