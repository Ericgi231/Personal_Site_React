import { type Express } from "express";

export function registerPublicApi(app: Express) {
  app.get("/api/public-test", (req, res) => {
    res.json({ message: "Hello from the public API!" });
  });
}