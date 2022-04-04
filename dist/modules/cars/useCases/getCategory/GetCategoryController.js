"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _GetCategoryUseCase = require("./GetCategoryUseCase");

class GetCategoryController {
  async handle(request, response) {
    const getCategoryUseCase = _tsyringe.container.resolve(_GetCategoryUseCase.GetCategoryUseCase);

    const result = await getCategoryUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result
    });
  }

}

exports.GetCategoryController = GetCategoryController;