import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_DATA } from "@modules/user/types";

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_KEY as string) as TOKEN_DATA;
};

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(403).send("Access Denied! no token provided.");

  try {
    const user = decodeToken(token);
    req.auth = user;

    if (next) return next();
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
};
