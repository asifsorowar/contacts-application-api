import { Request, Response } from "express";
import { UserService } from "../user/service";
import { AuthService } from "./service";
import { Login } from "./types";

export class TokenController {
  private userService = new UserService();
  private authService = new AuthService();

  login = async (
    req: Request<any, any, Login>,
    res: Response
  ): Promise<Response> => {
    const { email, password } = req.body;
    let user = await this.userService.getUserByEmail(email);
    if (!user) return res.status(400).send("email or password invalid!");

    const verified = await this.authService.verifyPassword(
      password,
      user?.password as string
    );
    if (!verified) return res.status(201).send("email or password invalid!");

    const token = await this.authService.createToken(user);

    return res.status(200).send(token);
  };
}
