"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, drivers_license, "isAdmin", avatar, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '0123456789', true, '', 'now()')
    `);
  });
  it("Should be able to create a new car category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/auth").send({
      email: "admin@rentalx.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body.token;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "SuperTest - Category Name",
      description: "SuperTest - Category Description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  it("Should not be able to create an existing car category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/auth").send({
      email: "admin@rentalx.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body.token;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "SuperTest - Category Name",
      description: "SuperTest - Category Description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(400);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});