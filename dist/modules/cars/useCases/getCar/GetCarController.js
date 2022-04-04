"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCarController = void 0;

var _tsyringe = require("tsyringe");

var _GetCarUseCase = require("./GetCarUseCase");

class GetCarController {
  async handle(request, response) {
    const {
      name,
      brand,
      category_id
    } = request.query;

    const getCarUseCase = _tsyringe.container.resolve(_GetCarUseCase.GetCarUseCase);

    const result = await getCarUseCase.execute({
      name: name,
      brand: brand,
      category_id: category_id
    });
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.GetCarController = GetCarController;