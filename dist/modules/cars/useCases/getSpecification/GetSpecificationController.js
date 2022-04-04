"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _GetSpecificationUseCase = require("./GetSpecificationUseCase");

class GetSpecificationController {
  async handle(request, response) {
    const getSpecificationUseCase = _tsyringe.container.resolve(_GetSpecificationUseCase.GetSpecificationUseCase);

    const result = await getSpecificationUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.GetSpecificationController = GetSpecificationController;