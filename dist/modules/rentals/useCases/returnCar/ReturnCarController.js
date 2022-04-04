"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReturnCarController = void 0;

var _tsyringe = require("tsyringe");

var _ReturnCarUseCase = require("./ReturnCarUseCase");

class ReturnCarController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user;
    const {
      rental_id
    } = request.params;

    const returnCarUseCase = _tsyringe.container.resolve(_ReturnCarUseCase.ReturnCarUseCase);

    const result = await returnCarUseCase.execute({
      rental_id,
      user_id
    });
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.ReturnCarController = ReturnCarController;