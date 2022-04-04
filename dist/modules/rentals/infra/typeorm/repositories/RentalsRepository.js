"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total
  }) {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id
  }) {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id
  }) {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return rental;
  }

  async getById({
    id
  }) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async getAllByUser({
    user_id
  }) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalsRepository = RentalsRepository;