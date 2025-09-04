import { Server as SocketIOServer } from 'socket.io';
import IntermissionState from "./IntermissionState";
import BettingState from "./BettingState";
import RaceState from "./RaceState";
import ResultsState from "./ResultsState";

// Define interface for your state objects
interface GameState {
  getName(): string;
  getDuration(): number;
}

const STATES: GameState[] = [
  new IntermissionState(),
  new BettingState(),
  new RaceState(),
  new ResultsState(),
];

export default class StateManager {
  private currentIndex = 0;
  private timer: NodeJS.Timeout | null = null;
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  getState(): string {
    return STATES[this.currentIndex].getName();
  }

  start(): void {
    this.emitState();
    this.scheduleNext();
  }

  private scheduleNext(): void {
    const duration = STATES[this.currentIndex].getDuration();
    this.timer = setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % STATES.length;
      this.emitState();
      this.scheduleNext();
    }, duration);
  }

  private emitState(): void {
    this.io.emit("state", { state: this.getState() });
  }

  stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}