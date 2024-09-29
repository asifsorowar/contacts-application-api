import { Request, Response } from "express";
import { UserService } from "./service";
import { AuthService } from "../token/service";
import { CREATE_USER } from "./types";

export class UserController {
  private userService = new UserService();
  private authService = new AuthService();

  active = async (req: Request, res: Response): Promise<Response> => {
    const auth = req.auth;

    let user = await this.userService.getUserById(auth?.id as number);
    if (!user) return res.status(400).send("invalid user id!");

    if (user.status === "ACTIVE") {
      return res.status(400).send("already activated!");
    }

    user = await this.userService.updateUser(auth?.id as number, {
      status: "ACTIVE",
    });

    const token = await this.authService.createToken(user);

    return res.status(200).send(token);
  };

  create = async (
    req: Request<any, any, CREATE_USER>,
    res: Response
  ): Promise<Response> => {
    const payload = req.body;

    let user = await this.userService.getUserByEmail(payload.email);
    if (user) return res.status(400).send("user already existed!");

    user = await this.userService.createUser(payload);

    const token = await this.userService.createActivationToken(user);

    return res.status(201).send(token);
  };
}
