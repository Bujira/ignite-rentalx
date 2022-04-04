"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    id,
    name,
    password,
    email,
    drivers_license,
    avatar
  }) {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      drivers_license,
      avatar
    });
    await this.repository.save(user);
    return user;
  }

  async getByEmail({
    email
  }) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async getById({
    id
  }) {
    const user = await this.repository.findOne(id);
    return user;
  }

}

exports.UsersRepository = UsersRepository;