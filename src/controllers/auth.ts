import { NextFunction, Request, Response } from "express";

export function ping(req: Request, res: Response, next: NextFunction) {
  res.end("Pong! Server is alive");
}
