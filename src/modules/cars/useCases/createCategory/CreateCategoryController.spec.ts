import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
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

  it("Should be able to create a new car category", async () => {
    const responseToken = await request(app).post("/auth").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { token } = responseToken.body.token;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "SuperTest - Category Name",
        description: "SuperTest - Category Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
