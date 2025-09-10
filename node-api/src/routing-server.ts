import express, { type Express } from "express";
import cors from "cors";
import http, { type Server } from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Socket } from 'net';

const app: Express = express();
const port: number = 3001;
const address: string = '127.0.0.1';
const server: Server = http.createServer(app);

app.use(cors());
app.use(express.json());


const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/node-api/animal-race-bets': '',
  },
});

app.use('/node-api/animal-race-bets', proxyMiddleware);

server.on('upgrade', (request, socket, head) => {
  console.log('WebSocket upgrade request for:', request.url);
  
  if (request.url && 
      (request.url.startsWith('/node-api/animal-race-bets/socket.io/'))) {
    console.log('Proxying WebSocket connection');
    proxyMiddleware.upgrade(request, socket as Socket, head);
  } else {
    console.log('Rejecting WebSocket connection to:', request.url);
    socket.destroy();
  }
});

app.get('/node-api/health', (_, res) => {
  res.json({
    status: 'ok',
    router: 'online',
    timestamp: Date.now()
  });
});

app.get('/node-api/connection', (_, res) => {
  res.json({
    status: 'connected',
    router: 'online',
    timestamp: Date.now()
  });
});

server.listen(port, address, () => {
  console.log(`Router running at http://localhost:${port}`);
  console.log(`Proxying /animal-race-bets to port 3002`);
});