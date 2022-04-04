"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetUserPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _ResetUserPasswordUseCase = require("./ResetUserPasswordUseCase");

class ResetUserPasswordController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetUserPasswordUseCase = _tsyringe.container.resolve(_ResetUserPasswordUseCase.ResetUserPasswordUseCase);

    const result = await resetUserPasswordUseCase.execute({
      token: String(token),
      password
    });
    return response.status(200).json({
      messsage: "Success!",
      result
    });
  }

}

exports.ResetUserPasswordController = ResetUserPasswordController;