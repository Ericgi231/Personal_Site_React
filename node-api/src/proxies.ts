import { createProxyMiddleware } from "http-proxy-middleware";
import type { Express, RequestHandler } from "express";

const createAppProxyMiddleware = (route: string, port: number): RequestHandler =>
  createProxyMiddleware({
    target: `http://localhost:${port}`,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      [`^${route}`]: '',
    },
  });

// Add more proxies here for each new app
const routeProxyMap: Array<{ route: string; port: number }> = [
  { route: "/node-api/animal-race-bets", port: 3002 },
];

export const registerProxies = (app: Express) => {
  routeProxyMap.forEach(({ route, port }) => {
    app.use(route, createAppProxyMiddleware(route, port));
  });
};