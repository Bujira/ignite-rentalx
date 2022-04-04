"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      password,
      email,
      drivers_license,
      avatar
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    const result = await createUserUseCase.execute({
      name,
      password,
      email,
      drivers_license,
      avatar
    });
    return response.status(201).json({
      message: "Success!",
      result
    });
  }

}

exports.CreateUserController = CreateUserController;