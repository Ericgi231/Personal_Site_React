import { Server as SocketIOServer } from 'socket.io';
import { generateIntermissionData, INTERMISSION_DURATION } from './states/intermission';
import { generateBettingData, BETTING_DURATION } from './states/betting';
import { generateRaceData, RACE_DURATION } from './states/race';
import { generateResultsData, RESULTS_DURATION } from './states/results';
import { GameStateEnum } from '@my-site/shared/animal-race-bets';

interface StateConfig {
  name: GameStateEnum;
  duration: number;
  generateData: () => any;
}

export class GameCycle {
  //temp
  private GameStateEnum = GameStateEnum.Betting;

  private io: SocketIOServer;
  private currentStateIndex = 0;
  private stateTimer: NodeJS.Timeout | null = null;
  private stateStartTime = 0; // Track when current state started
  
  private states: StateConfig[] = [
    {
      name: GameStateEnum.Intermission,
      duration: INTERMISSION_DURATION,
      generateData: generateIntermissionData
    },
    {
      name: GameStateEnum.Betting, 
      duration: BETTING_DURATION,
      generateData: generateBettingData
    },
    {
      name: GameStateEnum.Race,
      duration: RACE_DURATION,
      generateData: generateRaceData
    },
    {
      name: GameStateEnum.Results,
      duration: RESULTS_DURATION,
      generateData: generateResultsData
    }
  ];

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  start(): void {
    console.log('🎮 Starting AnimalRaceBets game cycle');
    this.transitionToState();
  }

  stop(): void {
    console.log('🛑 Stopping AnimalRaceBets game cycle');
    this.clearTimers();
  }


  getCurrentData(): any {
    return this.states[this.currentStateIndex].generateData();
  }

  getTimeRemaining(): number {
    const elapsed = Date.now() - this.stateStartTime;
    const remaining = Math.max(0, this.states[this.currentStateIndex].duration - elapsed);
    return Math.ceil(remaining / 1000); // Return seconds
  }

  // Send current state to newly connected user
  sendStateToUser(socketId: string): void {
    const currentData = this.getCurrentData();
    const timeRemaining = this.getTimeRemaining();

    this.io.to(socketId).emit('game_state', {
      data: currentData,
      timeRemaining,
      timestamp: Date.now()
    });

    console.log(`📤 Sent current state  to user ${socketId} (${timeRemaining}s remaining)`);
  }

  private transitionToState(): void {
    const currentState = this.states[this.currentStateIndex];
    const stateData = currentState.generateData();
    
    // Record when this state started
    this.stateStartTime = Date.now();
    
    console.log(`🔄 Transitioning to: ${currentState.name} (${currentState.duration / 1000}s)`);
    
    // Broadcast new state to all connected users (ONLY when state changes)
    this.io.emit('game_state', {
      state: currentState.name,
      data: stateData,
      timeRemaining: Math.ceil(currentState.duration / 1000),
      timestamp: this.stateStartTime
    });
    
    // Schedule next state transition
    this.stateTimer = setTimeout(() => {
      this.nextState();
    }, currentState.duration);
  }

  private nextState(): void {
    // Move to next state (loop back to beginning after results)
    this.currentStateIndex = (this.currentStateIndex + 1) % this.states.length;
    this.transitionToState();
  }

  private clearTimers(): void {
    if (this.stateTimer) {
      clearTimeout(this.stateTimer);
      this.stateTimer = null;
    }
  }
}