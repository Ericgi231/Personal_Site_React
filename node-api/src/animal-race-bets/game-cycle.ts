
import { Server as SocketIOServer } from 'socket.io';
import { generateIntermissionData } from './phases/intermission';
import { generateBettingData } from './phases/betting';
import { generateRaceData } from './phases/race';
import { generateResultsData } from './phases/results';
import { GamePhase, GameData } from '@my-site/shared/animal-race-bets';

type PhaseConfig = {
  name: GamePhase;
  duration: number;
  update: (gameData: GameData) => void;
};

export class GameCycle {
  private io: SocketIOServer;
  private currentPhaseIndex = 0;
  private phaseTimer: NodeJS.Timeout | null = null;
  private phaseStartTime = 0;
  private gameData: GameData;
  private phaseConfigs: PhaseConfig[];

  constructor(io: SocketIOServer) {
    this.io = io;
    this.phaseConfigs = [
      {
        name: GamePhase.Intermission,
        duration: 10000,
        update: (gd) => generateIntermissionData(gd)
      },
      {
        name: GamePhase.Betting,
        duration: 15000,
        update: (gd) => generateBettingData(gd)
      },
      {
        name: GamePhase.Race,
        duration: 5000,
        update: (gd) => generateRaceData(gd)
      },
      {
        name: GamePhase.Results,
        duration: 8000,
        update: (gd) => generateResultsData(gd)
      }
    ];

    this.gameData = {
      startTime: new Date(),
      duration: this.phaseConfigs[0].duration,
      currentPhase: this.phaseConfigs[0].name
    };
  }

  start(): void {
    console.log('Starting AnimalRaceBets game cycle');
    this.transitionToPhase();
  }

  stop(): void {
    console.log('Stopping AnimalRaceBets game cycle');
    this.clearTimer();
  }

  getCurrentGameData(): GameData {
    return { ...this.gameData };
  }

  getTimeRemaining(): number {
    const elapsed = Date.now() - this.phaseStartTime;
    const remaining = Math.max(0, this.phaseConfigs[this.currentPhaseIndex].duration - elapsed);
    return Math.ceil(remaining / 1000);
  }

  // Send current state to newly connected user
  public sendStateToUser(socketId: string): void {
    this.io.to(socketId).emit('game_state', {
      gameData: this.getCurrentGameData(),
      timeRemaining: this.getTimeRemaining(),
      timestamp: Date.now()
    });
    console.log(`Sent current state to user ${socketId} (${this.getTimeRemaining()}s remaining)`);
  }

  private transitionToPhase(): void {
    const phase = this.phaseConfigs[this.currentPhaseIndex];
    this.phaseStartTime = Date.now();
    this.gameData.currentPhase = phase.name;
    this.gameData.duration = phase.duration;
    this.gameData.startTime = new Date();
    phase.update(this.gameData);

    console.log(`Transitioning to: ${phase.name} (${phase.duration / 1000}s)`);

    // Broadcast updated gameData to all users
    this.io.emit('game_state', {
      gameData: this.getCurrentGameData(),
      timeRemaining: Math.ceil(phase.duration / 1000),
      timestamp: this.phaseStartTime
    });

    // Schedule next phase transition
    this.phaseTimer = setTimeout(() => {
      this.nextPhase();
    }, phase.duration);
  }

  private nextPhase(): void {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phaseConfigs.length;
    this.transitionToPhase();
  }

  private clearTimer(): void {
    if (this.phaseTimer) {
      clearTimeout(this.phaseTimer);
      this.phaseTimer = null;
    }
  }
}