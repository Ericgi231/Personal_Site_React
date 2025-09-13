import { io, Socket } from 'socket.io-client';
import { GameState } from '../stores';
import { ConnectionStatus } from '../types';

export function createGameSocket(url: string, options: object): Socket {
  return io(url, options);
}

export function handleConnectionInfo(store: GameState, socket: Socket, status: ConnectionStatus, error: string | null) {
  store.setConnectionInfo({
    status,
    error,
    socketId: socket.id,
    timestamp: Date.now(),
  });
}