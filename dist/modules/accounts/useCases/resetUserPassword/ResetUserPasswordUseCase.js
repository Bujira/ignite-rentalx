"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetUserPasswordUseCase = void 0;

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _IUserTokensRepository = require("@modules/accounts/repositories/IUserTokensRepository");

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetUserPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetUserPasswordUseCase {
  constructor(usersRepository, userTokensRepository, dateProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.getByRefreshToken({
      token
    });

    if (!userToken) {
      throw new _AppError.AppError("Token does not exist!", 404);
    }

    const dateNow = this.dateProvider.dateNow();
    const isTokenExpired = this.dateProvider.compareExpiration(userToken.expiration_date, dateNow);

    if (isTokenExpired) {
      throw new _AppError.AppError("Token is expired!");
    }

    const id = userToken.user_id;
    const user = await this.usersRepository.getById({
      id
    });
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await this.usersRepository.create(user);
    await this.userTokensRepository.deleteById({
      token_id: userToken.id
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetUserPasswordUseCase = ResetUserPasswordUseCase;