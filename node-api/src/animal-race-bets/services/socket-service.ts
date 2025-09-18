import { AccountType, GameData, PhaseInfo, SOCKET_EVENT_GAME_DATA, SOCKET_EVENT_PHASE_INFO, SOCKET_EVENT_USER_DATA, SOCKET_EVENT_WINNERID, UserData } from "@my-site/shared/animal-race-bets";
import { Server } from "socket.io";

/**
 * Send the current game data to all connected clients.
 * @param io Socket.IO server instance
 * @param gameData Current game data to send
 */
export function emitGameData(io: Server, gameData: GameData) {
  io.emit(SOCKET_EVENT_GAME_DATA, gameData);
}

/**
 * Send the current game data to an individual client.
 * @param io Socket.IO server instance
 * @param socketId Socket ID of the client to send data to
 * @param gameData Current game data to send
 */
export function emitGameDataToIndividual(io: Server, socketId: string, gameData: GameData): void {
  io.to(socketId).emit(SOCKET_EVENT_GAME_DATA, gameData);
}

/**
 * Send the current user data to an individual client TODO: integrate with real user system.
 * @param io Socket.IO server instance
 * @param socketId Socket ID of the client to send data to
 */
export function emitUserDataToIndividual(io: Server, socketId: string): void {
  const placeholderUser: UserData = {
      id: 21,
      type: AccountType.Guest,
      name: 'Guest21',
      balance: 1000
    };
    io.to(socketId).emit(SOCKET_EVENT_USER_DATA, placeholderUser);
}

/**
 * Send race winner to all connected clients.
 * @param io Socket.IO server instance
 * @param winnerId ID of the winning animal
 */
export function emitWinnerId(io: Server, winnerId: string) {
  io.emit(SOCKET_EVENT_WINNERID, winnerId);
}

/**
 * Send phase update to all connected clients.
 * @param io Socket.IO server instance
 * @param phase New game phase
 */
export function emitPhaseInfo(io: Server, phaseInfo: PhaseInfo) {
  io.emit(SOCKET_EVENT_PHASE_INFO, phaseInfo);
}