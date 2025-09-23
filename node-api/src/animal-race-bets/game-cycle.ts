
import { Server } from 'socket.io';
import { GameData, GamePhase } from '@my-site/shared/animal-race-bets';
import { PHASE_ORDER } from './data/phase-data';
import { AppData } from './types/app-types';
import { generateEmptyAppData, generateNewAppData } from './services/data-generation-service';
import { handleBettingPhase, handleIntermissionPhase, handleLoadingPhase, handleRacePhase, handleResultsPhase } from './services/phase-service';
import { emitBettingStart, emitIntermissionStart, emitPhaseInfo, emitRaceStart } from './services/socket-service';

export class GameCycle {
  private io: Server;
  private appData: AppData;
  private phaseTimer: NodeJS.Timeout | null = null;
  private phaseHandlers: Record<GamePhase, (appData: AppData) => AppData>;
  private phaseEmits: Record<GamePhase, () => void>;

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
    this.phaseEmits = {
      intermission: () => emitIntermissionStart(this.io, this.appData.gameData.phase, this.appData.gameData.race),
      betting: () => emitBettingStart(this.io, this.appData.gameData.phase, this.appData.gameData.intermission),
      race: () => emitRaceStart(this.io, this.appData.gameData.phase, this.appData.gameData.race.winnerId!),
      results: () => emitPhaseInfo(this.io, this.appData.gameData.phase),
      loading: () => {},
      connecting: () => {},
    };
  }

  private async processGamePhase(phase: GamePhase): Promise<void> {
    this.appData = this.phaseHandlers[phase](this.appData);
    this.phaseEmits[phase]();
    const timerMs = phase == GamePhase.Race? this.appData.backendData.raceDurationMs : this.appData.gameData.phase.durationMs;
    this.phaseTimer = setTimeout(() => {
      this.processGamePhase(PHASE_ORDER[(PHASE_ORDER.indexOf(phase) + 1) % PHASE_ORDER.length]);
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
    this.appData = generateNewAppData();
    this.processGamePhase(this.appData.gameData.phase.name);
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