"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      start_date: new Date(),
      total
    });
    this.rentals.push(rental);
    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id
  }) {
    const rental = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id
  }) {
    const rental = this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    return rental;
  }

  async getById({
    id
  }) {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async getAllByUser({
    user_id
  }) {
    const rentals = this.rentals.filter(rentals => rentals.user_id === user_id);
    return rentals;
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;