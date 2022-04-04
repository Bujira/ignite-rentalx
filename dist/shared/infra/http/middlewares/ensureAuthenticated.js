"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAutehnticated = ensureAutehnticated;

var _auth = _interopRequireDefault(require("@config/auth"));

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("@shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAutehnticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError("Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.token_secret);
    request.user = {
      id: user_id
    };
    return next();
  } catch {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}