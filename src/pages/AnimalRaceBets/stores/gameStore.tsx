import { create } from 'zustand';
import { GameData } from '@shared/animal-race-bets';
import { ConnectionInfo, ConnectionStatus } from '../types';

export interface GameState {
  gameData: GameData | null;
  setGameData: (data: GameData) => void;
  connectionInfo: ConnectionInfo | null;
  setConnectionInfo: (data: ConnectionInfo) => void;
}

const savedGameData = sessionStorage.getItem('animalRaceBetsGameData');

export const useGameStore = create<GameState>((set) => ({
  gameData: savedGameData ? JSON.parse(savedGameData) : null,
  setGameData: (data) => set({ gameData: data }),
  connectionInfo: {
    status: ConnectionStatus.Connecting,
    socketId: undefined,
    error: null,
    timestamp: Date.now(),
  },
  setConnectionInfo: (data) => set({ connectionInfo: data }),
}));
