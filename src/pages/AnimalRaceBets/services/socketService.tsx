import { Socket } from 'socket.io-client';
import { AppState } from '../stores';
import { ConnectionStatus } from '../types';

export function handleConnectionInfo(store: AppState, socket: Socket, status: ConnectionStatus, error: string | null) {
  store.setConnectionInfo({
    status,
    error,
    socketId: socket.id,
    timestamp: Date.now(),
  });
}