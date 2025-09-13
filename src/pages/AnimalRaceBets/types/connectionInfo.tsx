export enum ConnectionStatus {
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
}

export interface ConnectionInfo {
  status: ConnectionStatus;
  error: string | null;
  socketId: string | undefined;
  timestamp: number;
}