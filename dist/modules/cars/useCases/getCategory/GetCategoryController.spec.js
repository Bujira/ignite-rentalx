"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Get All Categories Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, drivers_license, "isAdmin", avatar, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '0123456789', true, '', 'now()')
    `);
  });
  it("Should be able to list all car categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/auth").send({
      email: "admin@rentalx.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body.token;
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "SuperTest - Category Name 1",
      description: "SuperTest - Category Description 1"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "SuperTest - Category Name 2",
      description: "SuperTest - Category Description 2"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body.result).toHaveLength(2);
    expect(response.body.result[0].name).toEqual("SuperTest - Category Name 1");
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});