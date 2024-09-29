import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.auth?.status !== "ACTIVE" || req.auth?.token_type !== "AUTH")
    return res.status(403).send("Access Denied!");

  if (next) return next();
};
