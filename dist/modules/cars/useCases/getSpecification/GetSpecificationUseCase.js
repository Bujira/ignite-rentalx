"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSpecificationUseCase = void 0;

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let GetSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _SpecificationsRepository.SpecificationsRepository === "undefined" ? Object : _SpecificationsRepository.SpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetSpecificationUseCase {
  constructor(specificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute() {
    const result = await this.specificationsRepository.getAll();
    return result;
  }

}) || _class) || _class) || _class) || _class);
exports.GetSpecificationUseCase = GetSpecificationUseCase;