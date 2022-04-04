"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

class SendForgotPasswordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordMailUseCase = _tsyringe.container.resolve(_sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

    const result = await sendForgotPasswordMailUseCase.execute({
      email
    });
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;