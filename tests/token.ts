import request from "supertest";
import { Express } from "express";
import { Login } from "@modules/token/types";
import { TOKEN_DATA } from "@modules/user/types";
import { decodeToken } from "@root/src/middlewares/authToken";

export const tokenTests = (app: Express) => () => {
  const endpoint = "/api/v1/token/auth";

  const loginUser: Login = {
    email: "test@test.com",
    password: "test",
  };

  it("POST /token/auth - should validate and return a auth token", async () => {
    const response = await request(app).post(endpoint).send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.text.length).toBeGreaterThan(40);

    //@ts-ignore
    global.token = response.text;

    const user: TOKEN_DATA = decodeToken(response.text);

    expect(user).toHaveProperty("id");

    expect(user.token_type).toBe("AUTH");
    expect(user.status).toBe("ACTIVE");
  });
};
