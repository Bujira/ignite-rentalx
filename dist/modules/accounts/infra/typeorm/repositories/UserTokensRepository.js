"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepository = void 0;

var _typeorm = require("typeorm");

class UserTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)("UserToken");
  }

  async create({
    user_id,
    refresh_token,
    expiration_date
  }) {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expiration_date
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async getByUserIdAndByRefreshToken({
    user_id,
    token
  }) {
    return this.repository.findOne({
      user_id,
      refresh_token: token
    });
  }

  async getByRefreshToken({
    token
  }) {
    return this.repository.findOne({
      refresh_token: token
    });
  }

  async deleteById({
    token_id
  }) {
    await this.repository.delete({
      id: token_id
    });
  }

}

exports.UserTokensRepository = UserTokensRepository;