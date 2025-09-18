import express, { Express } from "express";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
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

app.get('/node-api/health', (_req: ExpressRequest, res: ExpressResponse) => res.json({
  status: 'ok',
  router: 'online',
  timestamp: Date.now()
}));

server.listen(port, address, () => {
  console.log(`Router running at http://localhost:${port}`);
});