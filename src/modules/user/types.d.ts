import { Prisma } from "@database";
import { users, enum_user_status } from "@prisma/client";

export type USER = users;

export interface CREATE_USER {
  email: string;
  password: string;
  name: string;
}
