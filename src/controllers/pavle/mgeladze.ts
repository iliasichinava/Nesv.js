import { NextFunction, Request, Response } from "express";

export function boss(req: Request, res: Response, next: NextFunction) {
  res.end("hello, boss");
}
