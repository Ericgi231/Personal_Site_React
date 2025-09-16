
import { Server as SocketIOServer } from 'socket.io';
import { generateIntermissionData, generateBettingData, generateRaceData, generateResultsData } from './phases';
import { GamePhase, GameData, PHASE_DURATION_MAP, DEFAULT_PHASE_DURATION_MS } from '@my-site/shared/animal-race-bets';

interface PhaseInfo {
  gamePhase: GamePhase;
  updateMethod: (gd: GameData) => Promise<GameData>;
}

export class GameCycle {
  private io: SocketIOServer;
  private currentPhaseIndex = 0;
  private phaseTimer: NodeJS.Timeout | null = null;
  private gameData: GameData;
  private phases: PhaseInfo[];

  constructor(io: SocketIOServer) {
    this.io = io;
    this.phases = [
      {
        gamePhase: GamePhase.Intermission,
        updateMethod: (gd) => generateIntermissionData(gd)
      },
      {
        gamePhase: GamePhase.Betting,
        updateMethod: (gd) => generateBettingData(gd)
      },
      {
        gamePhase: GamePhase.Race,
        updateMethod: (gd) => generateRaceData(gd)
      },
      {
        gamePhase: GamePhase.Results,
        updateMethod: (gd) => generateResultsData(gd)
      },
    ];

    this.gameData = {
      startTime: new Date(),
      currentPhase: GamePhase.Intermission
    };
  }

  /**
   * Starts the game cycle, initiating phase transitions.
   */
  public start(): void {
    console.log('Starting AnimalRaceBets game cycle');
    this.transitionToPhase();
  }

  /**
   * Stops the game cycle, clearing any active timers.
   */
  public stop(): void {
    console.log('Stopping AnimalRaceBets game cycle');
    this.clearTimer();
  }

  /**
   * Returns the current game data.
   * @returns A copy of the current GameData object.
   */
  public getCurrentGameData(): GameData {
    return { ...this.gameData };
  }

  private async transitionToPhase(): Promise<void> {
    const phase = this.phases[this.currentPhaseIndex];
    this.gameData = await phase.updateMethod({...this.gameData, currentPhase: phase.gamePhase, startTime: new Date()});
    console.log(`Transitioning to: ${this.gameData.currentPhase}`);

    this.io.emit('game_data', this.getCurrentGameData());

    this.phaseTimer = setTimeout(() => {
      this.nextPhase();
    }, PHASE_DURATION_MAP[this.gameData.currentPhase] || DEFAULT_PHASE_DURATION_MS);
  }

  private nextPhase(): void {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;
    this.transitionToPhase();
  }

  private clearTimer(): void {
    if (this.phaseTimer) {
      clearTimeout(this.phaseTimer);
      this.phaseTimer = null;
    }
  }
}