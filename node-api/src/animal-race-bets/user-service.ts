import { Server as SocketIOServer } from "socket.io";
import { AccountType, GameData, UserData } from "@my-site/shared/animal-race-bets";

export function sendGameDataToUser(
  io: SocketIOServer,
  socketId: string,
  getGameData: () => GameData,
): void {
  io.to(socketId).emit('game_data', getGameData());
  console.log(`Sent current game data to user ${socketId}`);
}

export function sendUserDataToUser(io: SocketIOServer, socketId: string): void {
  // TODO full account system, maybe use Passport.js
  const placeholderUser: UserData = {
    id: 21,
    type: AccountType.Guest,
    name: 'Guest21',
    balance: 1000
  };
  io.to(socketId).emit('user_data', placeholderUser);
  console.log(`Sent placeholder user data to user ${socketId}`);
}