"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    id,
    name,
    email,
    drivers_license,
    avatar,
    avatar_url
  }) {
    const user = (0, _classTransformer.instanceToInstance)({
      id,
      name,
      email,
      drivers_license,
      avatar,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;