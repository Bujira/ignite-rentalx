"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationRoutes = void 0;

var _AuthenticateUserController = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");

var _express = require("express");

const authenticationRoutes = (0, _express.Router)();
exports.authenticationRoutes = authenticationRoutes;
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticationRoutes.post("/auth", authenticateUserController.handle);
authenticationRoutes.post("/refresh-token", refreshTokenController.handle);