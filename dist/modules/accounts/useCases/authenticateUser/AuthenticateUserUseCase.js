"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _auth = _interopRequireDefault(require("@config/auth"));

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _IUserTokensRepository = require("@modules/accounts/repositories/IUserTokensRepository");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, userTokensRepository, dateProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.getByEmail({
      email
    });
    const {
      token_secret,
      token_expiration,
      refresh_token_secret,
      refresh_token_expiration,
      refresh_token_expiration_in_days
    } = _auth.default;

    if (!user) {
      throw new _AppError.AppError("Invalid user or password!");
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Invalid user or password!");
    }

    const token = (0, _jsonwebtoken.sign)({}, token_secret, {
      subject: user.id,
      expiresIn: token_expiration
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expiration
    });
    const expiration_date = this.dateProvider.addDays(refresh_token_expiration_in_days);
    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expiration_date
    });
    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;