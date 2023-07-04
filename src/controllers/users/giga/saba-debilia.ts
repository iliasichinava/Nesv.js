import { NextFunction, Request, Response } from "express";

export function YLE(req: Request, res: Response, next: NextFunction) {
  res.end("BLAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}
