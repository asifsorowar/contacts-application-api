import { Prisma } from "@database";
import { users, enum_user_status } from "@prisma/client";

export type USER = users;

export interface CREATE_USER {
  email: string;
  password: string;
  name: string;
}

export interface TOKEN_DATA {
  id: number;
  name: string;
  email: string;
  status: enum_user_status;
  token_type: "ACTIVATION" | "AUTH";
}
