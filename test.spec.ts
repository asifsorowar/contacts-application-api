import app from "./index";
import prisma from "./src/database";

import { TOKEN_DATA } from "@modules/user/types";
import { decodeToken } from "@root/src/middlewares/authToken";

import { userTests } from "./tests/users";
import { tokenTests } from "./tests/token";
import { contactTests } from "./tests/contacts";

import { log } from "console";

describe("Sequence", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  describe("Users", userTests(app));
  describe("Token", tokenTests(app));
  describe("Contact", contactTests(app));

  afterAll(async () => {
    log("cleanuping....");
    //@ts-ignore
    if (global.userId) {
      //@ts-ignore
      await prisma.users.delete({ where: { id: global.userId } });
    }
    //@ts-ignore
    else if (global.token) {
      //@ts-ignore
      const user: TOKEN_DATA = decodeToken(global.token);
      await prisma.users.delete({ where: { id: user.id } });
    }

    prisma.$disconnect();
    log("cleaned....");
  });
});
