import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER } from "../user/types";

export class AuthService {
  public async verifyPassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  public async createToken(user: Partial<USER>) {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
      process.env.JWT_KEY as string
    );
  }
}
