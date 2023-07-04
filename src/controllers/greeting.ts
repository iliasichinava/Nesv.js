import { NextFunction, Request, Response } from "express";

export function greet(req: Request, res: Response, next: NextFunction) {
  res.end("hello");
}
