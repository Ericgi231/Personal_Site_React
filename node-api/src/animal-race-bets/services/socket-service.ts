import { AccountType, BettingUpdatePayload, FullUpdatePayload, GameData, IntermissionInfo, IntermissionUpdatePayload, PhaseInfo, PhaseUpdatePayload, RaceInfo, RaceUpdatePayload, SOCKET_EVENT_BETTING_UPDATE, SOCKET_EVENT_FULL_UPDATE, SOCKET_EVENT_INTERMISSION_UPDATE, SOCKET_EVENT_PHASE_UPDATE, SOCKET_EVENT_RACE_UPDATE, SOCKET_EVENT_USER_UPDATE, UserData, UserUpdatePayload } from "@my-site/shared/animal-race-bets";
import { Server } from "socket.io";

/**
 * Send the current game data to all connected clients.
 * @param io Socket.IO server instance
 * @param gameData Current game data to send
 */
export function emitGameData(io: Server, gameData: GameData) {
  io.emit(SOCKET_EVENT_FULL_UPDATE, {gameData} as FullUpdatePayload);
}

/**
 * Send the current game data to an individual client.
 * @param io Socket.IO server instance
 * @param socketId Socket ID of the client to send data to
 * @param gameData Current game data to send
 */
export function emitGameDataToIndividual(io: Server, socketId: string, gameData: GameData): void {
  io.to(socketId).emit(SOCKET_EVENT_FULL_UPDATE, {gameData} as FullUpdatePayload);
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
    io.to(socketId).emit(SOCKET_EVENT_USER_UPDATE, {userData: placeholderUser} as UserUpdatePayload);
}

/**
 * Send phase and race update to all connected clients.
 * @param io Socket.IO server instance
 * @param phaseInfo Phase information
 * @param raceInfo Race information
 */
export function emitIntermissionStart(io: Server, phaseInfo: PhaseInfo, raceInfo: RaceInfo): void {
  io.emit(SOCKET_EVENT_INTERMISSION_UPDATE, {phaseInfo, raceInfo} as IntermissionUpdatePayload);
}

/** 
 * Send phase and intermission update to all connected clients.
 * @param io Socket.IO server instance
 * @param phaseInfo Phase information
 * @param intermissionInfo Intermission information
 */
export function emitBettingStart(io: Server, phaseInfo: PhaseInfo, intermissionInfo: IntermissionInfo): void {
  io.emit(SOCKET_EVENT_BETTING_UPDATE, {phaseInfo, intermissionInfo} as BettingUpdatePayload);
}

/**
 * Send phase and winner update to all connected clients.
 * @param io Socket.IO server instance
 * @param phaseInfo Phase information
 * @param winnerId Winner animal ID
 */
export function emitRaceStart(io: Server, phaseInfo: PhaseInfo, winnerId: string): void {
  io.emit(SOCKET_EVENT_RACE_UPDATE, {phaseInfo, winnerId} as RaceUpdatePayload);
}

/**
 * Send phase update to all connected clients.
 * @param io Socket.IO server instance
 * @param phase Phase information
 */
export function emitPhaseInfo(io: Server, phaseInfo: PhaseInfo) {
  io.emit(SOCKET_EVENT_PHASE_UPDATE, {phaseInfo} as PhaseUpdatePayload);
}