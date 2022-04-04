"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRentalByUserController = void 0;

var _tsyringe = require("tsyringe");

var _GetRentalByUserUseCase = require("./GetRentalByUserUseCase");

class GetRentalByUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const getRentalByUserUseCase = _tsyringe.container.resolve(_GetRentalByUserUseCase.GetRentalByUserUseCase);

    const result = await getRentalByUserUseCase.execute({
      user_id: id
    });
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.GetRentalByUserController = GetRentalByUserController;