import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {
  it("Should be able to create a new car category", async () => {
    const response = await request(app).post("/categories").send({
      name: "SuperTest - Category Name",
      description: "SuperTest - Category Description",
    });

    expect(response.status).toBe(201);
  });
});
