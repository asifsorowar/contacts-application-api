import request from "supertest";
import { Express } from "express";
import { CREATE_USER, TOKEN_DATA } from "@modules/user/types";
import { decodeToken } from "@root/src/middlewares/authToken";
import { log } from "console";

export const userTests = (app: Express) => () => {
  const endpoint = "/api/v1/users";

  let userId: number;
  let activationToken: string;

  const createUser: CREATE_USER = {
    email: "test@test.com",
    name: "test user",
    password: "test",
  };

  it("POST /users - should create a new user and return a activation token", async () => {
    const response = await request(app).post(endpoint).send(createUser);

    expect(response.statusCode).toBe(201);
    expect(response.text.length).toBeGreaterThan(40);

    activationToken = response.text;

    //@ts-ignore
    global.token = response.text;

    const user: TOKEN_DATA = decodeToken(response.text);

    expect(user).toHaveProperty("id");
    userId = user.id as number;

    //@ts-ignore
    global.userId = user.id;

    expect(user.token_type).toBe("ACTIVATION");
    expect(user.status).toBe("PENDING");
  });

  it("PUT /users/active - without token: should return status 403", async () => {
    const response = await request(app).put(endpoint + `/active`);

    expect(response.statusCode).toBe(403);
  });

  it("PUT /users/active - with token: should return a new token", async () => {
    const response = await request(app)
      .put(endpoint + `/active`)
      .set({ Authorization: activationToken });

    expect(response.statusCode).toBe(200);
    expect(response.text.length).toBeGreaterThan(40);

    const user: TOKEN_DATA = decodeToken(response.text);

    expect(user).toHaveProperty("id");
    userId = user.id as number;

    expect(user.token_type).toBe("AUTH");
    expect(user.status).toBe("ACTIVE");
  });

  it("PUT /users/active - with token already activated: should return 400", async () => {
    const response = await request(app)
      .put(endpoint + `/active`)
      .set({ Authorization: activationToken });

    expect(response.statusCode).toBe(400);
  });
};
