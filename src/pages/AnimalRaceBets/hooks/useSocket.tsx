import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../stores/gameStore';
import { GameUpdatePayload } from '@my-site/shared';

const WS_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3001" // ← Base URL only
  : `https://${window.location.hostname}`;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { 
    setConnectionStatus, 
    updateGameState, 
    resetStore 
  } = useGameStore();

  useEffect(() => {
    console.log('🔌 Connecting to WebSocket:', WS_URL);
    
    socketRef.current = io(WS_URL, {
      path: '/node-api/animal-race-bets/socket.io/', // ← Explicitly set the path
      transports: ['polling', 'websocket'],
      timeout: 20000,
      forceNew: true,
      upgrade: true,
      rememberUpgrade: false,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('✅ Connected to AnimalRaceBets server via proxy');
      console.log('✅ Connected via path:', socket.io.opts.path);
      console.log('🔍 Full Socket.IO URL:', `${WS_URL}/node-api/animal-race-bets/socket.io/`);
      console.log('📡 Transport:', socket.io.engine.transport.name);
      setConnectionStatus(true, socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from AnimalRaceBets server. Reason:', reason);
      setConnectionStatus(false);
    });

    socket.on('connection_status', (data) => {
      console.log('📡 Connection status:', data);
      setConnectionStatus(true, data.socketId);
    });

    socket.on('game_state', (data) => {
      console.log('🎮 Received game state:', data);
      // Pass the timestamp from backend
      //updateGameState(data.state, data.data, data.timeRemaining);
    });

    socket.on('connect_error', (error) => {
      console.error('🚨 Connection failed for path:', `${WS_URL}/node-api/animal-race-bets/socket.io/`);
      console.error('Error:', error);
      setConnectionStatus(false);
    });

    return () => {
      console.log('🔌 Cleaning up socket connection');
      resetStore();
      socket.disconnect();
    };
  }, [setConnectionStatus, updateGameState, resetStore]);

  return {
    socket: socketRef.current,
    sendPing: () => {
      if (socketRef.current) {
        socketRef.current.emit('ping');
      }
    }
  };
};