import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Get All Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, drivers_license, "isAdmin", avatar, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '0123456789', true, '', 'now()')
    `
    );
  });

  it("Should be able to list all car categories", async () => {
    const responseToken = await request(app).post("/auth").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { token } = responseToken.body.token;

    await request(app)
      .post("/categories")
      .send({
        name: "SuperTest - Category Name 1",
        description: "SuperTest - Category Description 1",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .post("/categories")
      .send({
        name: "SuperTest - Category Name 2",
        description: "SuperTest - Category Description 2",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.result).toHaveLength(2);
    expect(response.body.result[0].name).toEqual("SuperTest - Category Name 1");
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
