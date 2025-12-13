import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

config();

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

if (!INTERNAL_API_KEY) {
  throw new Error("Missing API_KEY environment variable");
}

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/") {
    return next();
  }

  const clientKey = req.headers["x-api-key"];

  if (clientKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
