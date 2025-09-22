
import { Server } from 'socket.io';
import { GameData, GamePhase } from '@my-site/shared/animal-race-bets';
import { PHASE_DURATION_MAP, PHASE_ORDER } from './data/phase-data';
import { AppData } from './types/app-types';
import { generateEmptyAppData } from './services/data-generation-service';
import { handleBettingPhase, handleIntermissionPhase, handleLoadingPhase, handleRacePhase, handleResultsPhase } from './services/phase-service';

export class GameCycle {
  private io: Server;
  private appData: AppData;
  private phaseTimer: NodeJS.Timeout | null = null;
  private phaseHandlers: Record<GamePhase, (io: Server, appData: AppData) => Promise<AppData>>;

  constructor(io: Server) {
    this.io = io;
    this.appData = generateEmptyAppData();
    this.phaseHandlers = {
      intermission: handleIntermissionPhase,
      betting: handleBettingPhase,
      race: handleRacePhase,
      results: handleResultsPhase,
      loading: handleLoadingPhase,
      connecting: handleLoadingPhase,
    };
  }

  private nextPhase(): void {
    const newPhase = PHASE_ORDER[(PHASE_ORDER.indexOf(this.appData.gameData.phase.name) + 1) % PHASE_ORDER.length];
    this.appData.gameData.phase = {
      startTime: new Date(),
      name: newPhase,
      durationMs: PHASE_DURATION_MAP[newPhase],
    };
    this.processGamePhase();
  }

  private async processGamePhase(): Promise<void> {
    this.appData = await this.phaseHandlers[this.appData.gameData.phase.name](this.io, this.appData);
    const timerMs = this.appData.gameData.phase.name == GamePhase.Race? this.appData.backendData.raceDurationMs : this.appData.gameData.phase.durationMs;
    this.phaseTimer = setTimeout(() => {
      this.nextPhase();
    }, timerMs);
  }

  private clearTimer(): void {
    if (this.phaseTimer) {
      clearTimeout(this.phaseTimer);
      this.phaseTimer = null;
    }
  }

  /**
   * Starts the game cycle, initiating phase transitions.
   */
  public start(): void {
    console.log('Starting AnimalRaceBets game cycle');
    this.processGamePhase();
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
    return { ...this.appData.gameData };
  }
}