"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageUseCase = void 0;

var _CarImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarImagesRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _tsyringe = require("tsyringe");

var _IStorageProvider = require("@shared/container/providers/StorageProvider/IStorageProvider");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let UploadCarImageUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarImagesRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _CarsRepository.CarsRepository === "undefined" ? Object : _CarsRepository.CarsRepository, typeof _CarImagesRepository.CarImagesRepository === "undefined" ? Object : _CarImagesRepository.CarImagesRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UploadCarImageUseCase {
  constructor(carsRepository, carImagesRepository, storageProvider) {
    this.carsRepository = carsRepository;
    this.carImagesRepository = carImagesRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    image_names,
    car_id
  }) {
    const car = await this.carsRepository.getById({
      car_id
    });

    if (!car) {
      throw new _AppError.AppError("Car does not exist!", 404);
    }

    image_names.map(async image => {
      await this.carImagesRepository.create({
        image_name: image,
        car_id
      });
      await this.storageProvider.save(image, "cars");
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImageUseCase = UploadCarImageUseCase;