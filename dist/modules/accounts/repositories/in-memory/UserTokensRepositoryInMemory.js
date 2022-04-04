"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepositoryInMemory = void 0;

var _UserToken = require("@modules/accounts/infra/typeorm/entities/UserToken");

class UserTokensRepositoryInMemory {
  constructor() {
    this.userTokens = [];
  }

  async create({
    user_id,
    refresh_token,
    expiration_date
  }) {
    const userToken = new _UserToken.UserToken();
    Object.assign(userToken, {
      user_id,
      refresh_token,
      expiration_date
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async getByUserIdAndByRefreshToken({
    user_id,
    token
  }) {
    return this.userTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token);
  }

  async getByRefreshToken({
    token
  }) {
    return this.userTokens.find(userToken => userToken.refresh_token === token);
  }

  async deleteById({
    token_id
  }) {
    const userToken = this.userTokens.find(userToken => userToken.id === token_id);
    const deleteToken = this.userTokens.indexOf(userToken);
    this.userTokens.splice(deleteToken);
  }

}

exports.UserTokensRepositoryInMemory = UserTokensRepositoryInMemory;