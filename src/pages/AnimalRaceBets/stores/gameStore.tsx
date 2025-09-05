import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type GameState = 'intermission' | 'betting' | 'race' | 'results';

interface IntermissionData {
  loadingScreen: 'sunset' | 'forest' | 'stadium' | 'desert';
  racer1Id: string;
  racer2Id: string;
}

interface SimpleStateData {
  randomNumber: number;
}

interface GameStoreState {
  // Connection status
  isConnected: boolean;
  socketId: string | null;
  
  // Current state
  currentState: GameState;
  timeRemaining: number;
  stateStartTime: number;
  stateDuration: number;
  lastUpdated: number;
  
  // Structured data (Option 3 approach)
  sessionData: SessionData | null;
  intermissionData: IntermissionData | null;
  raceData: RaceData | null;
  bettingData: BettingData | null;
  resultsData: ResultsData | null;
  stateSpecificData: Record<GameState, any>;
  
  // Actions
  setConnectionStatus: (connected: boolean, socketId?: string) => void;
  updateGameState: (payload: GameUpdatePayload) => void;
  resetStore: () => void;
}

// Types for the structured data
interface SessionData {
  currency: number;
  userId?: string;
  sessionId?: string;
  serverTime: number;
}

interface RaceData {
  raceId: string;
  racers: Array<{
    id: string;
    name: string;
    odds: number;
  }>;
  trackConditions?: string;
  weatherConditions?: string;
}

interface BettingData {
  userBets: Array<{
    racerId: string;
    amount: number;
    potentialWin: number;
  }>;
  totalPool: number;
  odds: Record<string, number>;
  bettingDeadline: number;
}

interface ResultsData {
  winner: string;
  positions: string[];
  raceTime: number;
  payouts: Record<string, number>;
}

interface GameUpdatePayload {
  state: GameState;
  timeRemaining: number;
  timestamp: number;
  data: {
    session?: SessionData;
    race?: RaceData;
    betting?: BettingData;
    results?: ResultsData;
    stateSpecific: Record<GameState, any>;
  };
}

const initialState = {
  isConnected: false,
  socketId: null,
  currentState: 'intermission' as GameState,
  timeRemaining: 0,
  stateStartTime: 0,
  stateDuration: 0,
  lastUpdated: 0,
  sessionData: null,
  raceData: null,
  bettingData: null,
  resultsData: null,
  stateSpecificData: {},
};

export const useGameStore = create<GameStoreState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setConnectionStatus: (connected: boolean, socketId?: string) => {
        set({ 
          isConnected: connected, 
          socketId: socketId || null,
          lastUpdated: Date.now()
        }, false, 'setConnectionStatus');
      },
      
      updateGameState: (payload: GameUpdatePayload) => {
        console.log(`🎮 Updating game state: ${payload.state}`, payload.data);
        
        const updates: Partial<GameStoreState> = {
          currentState: payload.state,
          timeRemaining: payload.timeRemaining,
          stateStartTime: payload.timestamp,
          stateDuration: payload.timeRemaining,
          lastUpdated: Date.now(),
        };
        
        // Update structured data (only if provided)
        if (payload.data.session) {
          updates.sessionData = { ...get().sessionData, ...payload.data.session };
        }
        
        if (payload.data.race) {
          updates.raceData = { ...get().raceData, ...payload.data.race };
        }
        
        if (payload.data.betting) {
          updates.bettingData = { ...get().bettingData, ...payload.data.betting };
        }
        
        if (payload.data.results) {
          updates.resultsData = { ...get().resultsData, ...payload.data.results };
        }
        
        // Update state-specific data
        if (payload.data.stateSpecific[payload.state]) {
          updates.stateSpecificData = {
            ...get().stateSpecificData,
            [payload.state]: payload.data.stateSpecific[payload.state]
          };
        }
        
        set(updates, false, `updateGameState-${payload.state}`);
      },
      
      resetStore: () => {
        set({
          isConnected: false,
          socketId: null,
          currentState: 'intermission',
          timeRemaining: 0,
          stateStartTime: 0,
          stateDuration: 0,
          lastUpdated: 0,
          sessionData: null,
          raceData: null,  
          bettingData: null,
          resultsData: null,
          //stateSpecificData: {},
        }, false, 'resetStore');
      }
    }),
    { name: 'animal-race-game-store' }
  )
);