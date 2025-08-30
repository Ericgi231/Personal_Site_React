import IntermissionState from "./IntermissionState";
import BettingState from "./BettingState";
import RaceState from "./RaceState";
import ResultsState from "./ResultsState";

const STATES = [
  new IntermissionState(),
  new BettingState(),
  new RaceState(),
  new ResultsState(),
];

export default class StateManager {
  private currentIndex = 0;
  private timer: NodeJS.Timeout | null = null;
  private io: any;

  constructor(io: any) {
    this.io = io;
  }

  getState() {
    return STATES[this.currentIndex].getName();
  }

  start() {
    this.emitState();
    this.scheduleNext();
  }

  private scheduleNext() {
    const duration = STATES[this.currentIndex].getDuration();
    this.timer = setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % STATES.length;
      this.emitState();
      this.scheduleNext();
    }, duration);
  }

  private emitState() {
    this.io.emit("state", { state: this.getState() });
  }
}