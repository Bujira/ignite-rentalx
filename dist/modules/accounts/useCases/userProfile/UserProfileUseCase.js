"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileUseCase = void 0;

var _UserMaps = require("@modules/accounts/mappers/UserMaps");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let UserProfileUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UserProfileUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    id
  }) {
    const user = await this.usersRepository.getById({
      id
    });

    if (!user) {
      throw new _AppError.AppError("User does not exist!", 404);
    }

    return _UserMaps.UserMap.toDTO(user);
  }

}) || _class) || _class) || _class) || _class);
exports.UserProfileUseCase = UserProfileUseCase;