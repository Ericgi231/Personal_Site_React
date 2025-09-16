import { create } from 'zustand';
import { GameData, UserData, GamePhase, AccountType } from '@my-site/shared/animal-race-bets';
import { ConnectionInfo, ConnectionStatus } from '../types';

export interface AppState {
  gameData: GameData;
  setGameData: (data: GameData) => void;
  connectionInfo: ConnectionInfo;
  setConnectionInfo: (data: ConnectionInfo) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const savedGameData = sessionStorage.getItem('animalRaceBetsGameData');
const savedConnectionInfo = sessionStorage.getItem('animalRaceBetsConnectionInfo');
const savedUserData = sessionStorage.getItem('animalRaceBetsUserData');

export const useGameStore = create<AppState>((set) => ({
  gameData: savedGameData ? JSON.parse(savedGameData) : {
    startTime: new Date(),
    duration: 60000,
    currentPhase: GamePhase.Loading
  },
  setGameData: (data) => set({ gameData: data }),
  connectionInfo: savedConnectionInfo ? JSON.parse(savedConnectionInfo) : {
    status: ConnectionStatus.Connecting,
    socketId: undefined,
    error: null,
    timestamp: Date.now(),
  },
  setConnectionInfo: (data) => set({ connectionInfo: data }),
  userData: savedUserData ? JSON.parse(savedUserData) : {
    id: 0,
    type: AccountType.Invalid,
    name: '',
    balance: 0
  },
  setUserData: (data) => set({ userData: data })
}));
