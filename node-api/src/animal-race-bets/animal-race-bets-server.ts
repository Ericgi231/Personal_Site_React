import express, { Express } from "express";
import cors from "cors";
import http, { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { GameCycle } from "./game-cycle";

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

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  
  gameCycle.sendStateToUser(socket.id);
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('ping', () => {
    socket.emit('pong', { timestamp: Date.now() });
  });
});

gameCycle.start();

process.on('SIGTERM', () => {
  console.log('Shutting down AnimalRaceBets server...');
  gameCycle.stop();
  server.close(() => {
    console.log('AnimalRaceBets server closed');
    process.exit(0);
  });
});

app.get('/health', (_, res) => {
  res.json({ 
    status: 'ok',
    game: 'AnimalRaceBets',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AnimalRaceBets Server running at http://localhost:${port}`);
});