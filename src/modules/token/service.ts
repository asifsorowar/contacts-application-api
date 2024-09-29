import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER, TOKEN_DATA } from "../user/types";

export class AuthService {
  public async verifyPassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  public async createToken(user: Partial<USER>) {
    const tokenData: TOKEN_DATA = {
      id: user.id!,
      name: user.name!,
      email: user.email!,
      status: user.status!,
      token_type: "AUTH",
    };

    return jwt.sign(tokenData, process.env.JWT_KEY as string);
  }
}
