import { Req, Res, Next } from "../libs/types/index";

export function ping(req: Req, res: Res, next: Next) {
  res.end("Pong! Server is alive");
}
