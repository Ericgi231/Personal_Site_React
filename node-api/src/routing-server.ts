import express, { type Express } from "express";
import cors from "cors";
import http, { type Server } from "http";
import { registerProxies } from "./proxies";
  
const app: Express = express();
const port: number = 3001;
const address: string = '127.0.0.1';
const server: Server = http.createServer(app);

app.use(cors());
app.use(express.json());

registerProxies(app);

app.get('/node-api/health', (_: any, res: any) => res.json({
  status: 'ok',
  router: 'online',
  timestamp: Date.now()
}));

server.listen(port, address, () => {
  console.log(`Router running at http://localhost:${port}`);
});