"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReturnCarUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ReturnCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ReturnCarUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    rental_id,
    user_id
  }) {
    const rental = await this.rentalsRepository.getById({
      id: rental_id
    });
    const car = await this.carsRepository.getById({
      car_id: rental.car_id
    });
    const minimunRentingDays = 1;

    if (!rental) {
      throw new _AppError.AppError("Rental does not exist!", 404);
    }

    const dateNow = this.dateProvider.dateNow();

    if (rental.end_date) {
      throw new _AppError.AppError("This rental is over. The car has been returned already!");
    }

    let rentingDays = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (rentingDays <= 0) {
      rentingDays = minimunRentingDays;
    }

    const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
    let total = 0;

    if (delay > 0) {
      const calculatedFine = delay * car.fine_amount;
      total = calculatedFine;
    }

    total += rentingDays * car.daily_rate;
    rental.end_date = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    const {
      id
    } = car;
    const available = true;
    await this.carsRepository.updateStatus({
      id,
      available
    });
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ReturnCarUseCase = ReturnCarUseCase;