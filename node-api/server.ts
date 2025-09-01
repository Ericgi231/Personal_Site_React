import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import StateManager from "./AnimalRaceBets/StateManager";

const app = express();
const port = 3001;
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" }
});

const stateManager = new StateManager(io);

io.on("connection", (socket) => {
  socket.emit("state", { state: stateManager.getState() });
});

stateManager.start();

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});