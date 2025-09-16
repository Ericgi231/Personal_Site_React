import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { AppState, useGameStore } from '../stores';
import { handleConnectionInfo } from '../services';
import { ConnectionStatus } from '../types';
import { GameData, UserData } from '@my-site/shared/animal-race-bets';

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

    socket.on('game_data', ( gameData: GameData ) => {
      console.log('Received game data:', gameData);
      store.setGameData(gameData);
    });

    socket.on('user_data', ( userData: UserData ) => {
      console.log('Received user data:', userData);
      store.setUserData(userData);
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