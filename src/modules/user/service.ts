import bcrypt from "bcrypt";
import { prisma, Prisma } from "@database";
import jwt from "jsonwebtoken";
import { USER, TOKEN_DATA } from "../user/types";

export class UserService {
  public async getUserById(userId: number) {
    const user = await prisma.users.findUnique({
      omit: {
        password: true,
      },
      where: {
        id: userId,
      },
    });

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async createUser(data: Prisma.usersCreateInput) {
    data.password = await this.encryptPassword(data.password);

    const user = await prisma.users.create({
      data,
    });

    return user;
  }

  public async updateUser(id: number, data: Prisma.usersUpdateInput) {
    const user = await prisma.users.update({
      where: {
        id,
      },
      data,
      omit: {
        password: true,
      },
    });

    return user;
  }

  public async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async createActivationToken(user: Partial<USER>) {
    const tokenData: TOKEN_DATA = {
      id: user.id!,
      name: user.name!,
      email: user.email!,
      status: user.status!,
      token_type: "ACTIVATION",
    };

    return jwt.sign(tokenData, process.env.JWT_KEY as string);
  }
}
