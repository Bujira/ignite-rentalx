"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const {
      car_id,
      expected_return_date
    } = request.body;

    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const result = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date
    });
    return response.status(201).json({
      message: "Success!",
      result
    });
  }

}

exports.CreateRentalController = CreateRentalController;