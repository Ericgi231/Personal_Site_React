import express, { Express } from "express";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import cors from "cors";
import http, { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { GameCycle } from "./game-cycle";
import { emitGameDataToIndividual, emitUserDataToIndividual } from "./services/socket-service";

const app: Express = express();
const port: number = 3002;
const server: Server = http.createServer(app);
const timeout: number = 60000;

app.use(cors());
app.use(express.json());

const io = new SocketIOServer(server, {
  cors: { origin: "*" },
  pingTimeout: timeout,
});

const gameCycle = new GameCycle(io);
gameCycle.start();

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  
  emitGameDataToIndividual(io, socket.id, gameCycle.getCurrentGameData());
  emitUserDataToIndividual(io, socket.id);
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('ping', () => {
    socket.emit('pong', { timestamp: Date.now() });
  });
});

process.on('SIGTERM', () => {
  console.log('Shutting down AnimalRaceBets server...');
  gameCycle.stop();
  server.close(() => {
    console.log('AnimalRaceBets server closed');
    process.exit(0);
  });
});

app.get('/health', (_req: ExpressRequest, res: ExpressResponse) => {
  res.json({ 
    status: 'ok',
    game: 'AnimalRaceBets',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`AnimalRaceBets Server running at http://localhost:${port}`);
});