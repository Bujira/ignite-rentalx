"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImageController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;

    const uploadCarImageUseCase = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImageUseCase);

    const image_names = images.map(file => file.filename);
    await uploadCarImageUseCase.execute({
      image_names,
      car_id: id
    });
    return response.status(201).json({
      message: "Success!"
    });
  }

}

exports.UploadCarImageController = UploadCarImageController;