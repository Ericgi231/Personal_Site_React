export interface BaseState {
  getName(): string;
  getDuration(): number;
  generateData(): any;
}

// Optional: Abstract class approach if you want shared functionality
export abstract class AbstractBaseState implements BaseState {
  abstract getName(): string;
  abstract getDuration(): number;
  abstract generateData(): any;

  // Shared utility methods
  protected log(message: string): void {
    console.log(`[${this.getName()}] ${message}`);
  }

  protected formatDuration(): string {
    return `${this.getDuration() / 1000}s`;
  }
}