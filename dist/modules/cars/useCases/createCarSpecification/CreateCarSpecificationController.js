"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpeficiationUseCase = require("./CreateCarSpeficiationUseCase");

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      specifications_id
    } = request.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpeficiationUseCase.CreateCarSpecificationUseCase);

    const result = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id
    });
    return response.status(201).json({
      message: "Success!,",
      result
    });
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;