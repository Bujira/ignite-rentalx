"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;

var _User = require("../../infra/typeorm/entities/User");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    name,
    password,
    email,
    drivers_license
  }) {
    const user = new _User.User();
    Object.assign(user, {
      name,
      password,
      email,
      drivers_license
    });
    this.users.push(user);
    return user;
  }

  async getByEmail({
    email
  }) {
    return this.users.find(user => user.email === email);
  }

  async getById({
    id
  }) {
    return this.users.find(user => user.id === id);
  }

}

exports.UsersRepositoryInMemory = UsersRepositoryInMemory;