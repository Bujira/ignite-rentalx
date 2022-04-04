"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;

var _tsyringe = require("tsyringe");

var _RefreshTokenUseCase = require("./RefreshTokenUseCase");

class RefreshTokenController {
  async handle(request, response) {
    const token = request.query.token || request.headers["x-access-token"] || request.body.token;

    const refreshTokenUseCase = _tsyringe.container.resolve(_RefreshTokenUseCase.RefreshTokenUseCase);

    const result = await refreshTokenUseCase.execute({
      token
    });
    return response.status(201).json({
      message: "Success!",
      result
    });
  }

}

exports.RefreshTokenController = RefreshTokenController;