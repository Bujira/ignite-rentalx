"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRentalByUserUseCase = void 0;

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let GetRentalByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetRentalByUserUseCase {
  constructor(rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute({
    user_id
  }) {
    const rentals = await this.rentalsRepository.getAllByUser({
      user_id
    });
    return rentals;
  }

}) || _class) || _class) || _class) || _class);
exports.GetRentalByUserUseCase = GetRentalByUserUseCase;