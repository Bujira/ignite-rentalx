"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUseCase = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const token = await authenticateUseCase.execute({
      email,
      password
    });
    return response.status(200).json({
      message: "Success!",
      token
    });
  }

}

exports.AuthenticateUserController = AuthenticateUserController;