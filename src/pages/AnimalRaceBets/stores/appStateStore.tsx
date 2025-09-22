import { create } from 'zustand';
import { GameData, UserData, GamePhase, AccountType, PhaseInfo } from '@my-site/shared/animal-race-bets';
import { ConnectionInfo, ConnectionStatus } from '../types';

export interface AppState {
  gameData: GameData;
  setGameData: (data: GameData) => void;
  setPhaseInfo: (data: PhaseInfo) => void;
  setWinner: (winner: string) => void;
  connectionInfo: ConnectionInfo;
  setConnectionInfo: (data: ConnectionInfo) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
}

// const savedGameData = sessionStorage.getItem('animalRaceBetsGameData');
// const savedConnectionInfo = sessionStorage.getItem('animalRaceBetsConnectionInfo');
const savedUserData = sessionStorage.getItem('animalRaceBetsUserData');

export const useGameStore = create<AppState>((set) => ({
  gameData: {
    phase: {
      startTime: new Date(0),
      name: GamePhase.Connecting,
      durationMs: 0,
    },
    intermission: {
      id: '',
      animalIds: [],
    },
    race: {
      trackId: '',
      animalIds: [],
      raceSeed: 0,
    },
    bets: [],
  },
  setGameData: (data) => set({ gameData: data }),
  setPhaseInfo: (data) => set((state) => ({
    gameData: {
      ...state.gameData,
      phase: data
    }
  })),
  setWinner: (winner: string) => set((state) => ({
    gameData: {
      ...state.gameData,
      race: {
        ...state.gameData.race,
        winnerId: winner
      }
    }
  })),
  connectionInfo: {
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
