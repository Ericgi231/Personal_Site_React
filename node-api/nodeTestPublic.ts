import { type Express } from "express";

export function registerPublicApi(app: Express) {
  app.get("/node-api/public-test", (req, res) => {
    res.json({ message: "Hello from the public API!" });
  });
}