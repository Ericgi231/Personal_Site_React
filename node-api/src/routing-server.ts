import express from "express";
import cors from "cors";
import http from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Socket } from 'net';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/node-api/animal-race-bets': '',  // /node-api/animal-race-bets/* → /*
  },
});

// Apply the proxy
app.use('/node-api/animal-race-bets', proxyMiddleware);

// Handle WebSocket upgrades manually for better control
server.on('upgrade', (request, socket, head) => {
  console.log('🔌 WebSocket upgrade request for:', request.url);
  
  if (request.url && 
      (request.url.startsWith('/node-api/animal-race-bets/socket.io/'))) {
    console.log('🔄 Proxying WebSocket connection');
    proxyMiddleware.upgrade(request, socket as Socket, head);
  } else {
    console.log('❌ Rejecting WebSocket connection to:', request.url);
    socket.destroy();
  }
});

app.get(['/health', '/node-api/health'], (req, res) => {
  res.json({
    status: 'ok',
    router: 'online',
    timestamp: Date.now()
  });
});

app.get('/connection', (req, res) => {
  res.json({
    status: 'connected',
    router: 'online',
    timestamp: Date.now()
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Router running at http://localhost:${port}`);
  console.log(`🎮 Proxying /animal-race-bets to port 3002`);
});