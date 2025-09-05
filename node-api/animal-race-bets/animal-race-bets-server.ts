import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { GameCycle } from "./game-cycle";

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
  pingTimeout: 60000,
});

// Initialize game cycle
const gameCycle = new GameCycle(io);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    game: 'AnimalRaceBets',
    currentState: gameCycle.getCurrentState(),
    timeRemaining: gameCycle.getTimeRemaining(),
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// WebSocket connection handling
io.on('connection', (socket: Socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  
  // Send current game state to newly connected user
  gameCycle.sendStateToUser(socket.id);
  
  // Send connection confirmation
  socket.emit('connection_status', {
    status: 'connected',
    socketId: socket.id,
    currentState: gameCycle.getCurrentState(),
    timestamp: Date.now()
  });

  socket.on('disconnect', () => {
    console.log(`🔌 User disconnected: ${socket.id}`);
  });

  // Handle ping for connection testing
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: Date.now() });
  });
});

// Start the game cycle
gameCycle.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down AnimalRaceBets server...');
  gameCycle.stop();
  server.close(() => {
    console.log('✅ AnimalRaceBets server closed');
    process.exit(0);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`🏇 AnimalRaceBets Server running at http://localhost:${port}`);
  console.log(`🎮 Game cycle started - Current state: ${gameCycle.getCurrentState()}`);
});