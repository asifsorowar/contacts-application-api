import request from "supertest";
import { Express } from "express";
import { Contact } from "@modules/contact/types";
import { log } from "console";

export const contactTests = (app: Express) => () => {
  const endpoint = "/api/v1/contacts";
  let contactId: number;

  const createContact: Partial<Contact> = {
    email: "test@test.com",
    name: "test",
    address: "test address",
    phoneNumber: "01711111111",
    designation: "SWE",
  };

  it("POST /contacts - without token it should return 403", async () => {
    const response = await request(app).post(endpoint).send(createContact);

    expect(response.statusCode).toBe(403);

    contactId = response.body.id;
  });

  it("POST /contacts - with token it should create a new contact", async () => {
    const response = await request(app)
      .post(endpoint)
      .send(createContact)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");

    contactId = response.body.id;
  });

  it("POST /contacts - with token it should return 400 duplicate contact name error", async () => {
    const response = await request(app)
      .post(endpoint)
      .send(createContact)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(400);
    expect(response.text).toContain("name");
  });

  it("GET /contacts/:id - with token it should return a contact", async () => {
    const response = await request(app)
      .get(`${endpoint}/${contactId}`)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);
    expect(response.body.name).toBe(createContact.name);
  });

  it("GET /contacts - with token it should return all the contacts of the user", async () => {
    const response = await request(app)
      .get(endpoint)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("PUT /contacts/:id - with token it should update a contact", async () => {
    const response = await request(app)
      .put(`${endpoint}/${contactId}`)
      .send({ ...createContact, designation: "changed" })
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(200);
    expect(response.body.designation).toBe("changed");
  });

  it("DELETE /contacts/:id - should delete a contact", async () => {
    const response = await request(app)
      .delete(`${endpoint}/${contactId}`)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);

    // Verify the contact was deleted
    const getResponse = await request(app)
      .get(`${endpoint}/${contactId}`)
      //@ts-ignore
      .set({ Authorization: global.token });

    expect(getResponse.statusCode).toBe(404);
  });
};
