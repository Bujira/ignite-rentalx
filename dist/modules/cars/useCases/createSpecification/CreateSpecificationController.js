"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");

class CreateSpecificationController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createSpecificationsUseCase = _tsyringe.container.resolve(_CreateSpecificationUseCase.CreateSpecificationUseCase);

    const result = await createSpecificationsUseCase.execute({
      name,
      description
    });
    return response.status(201).json({
      message: "Success!",
      result
    });
  }

}

exports.CreateSpecificationController = CreateSpecificationController;