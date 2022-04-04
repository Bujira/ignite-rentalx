"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications
    });
    this.cars.push(car);
    return car;
  }

  async getByLicensePlate({
    license_plate
  }) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async getById({
    car_id
  }) {
    return this.cars.find(car => car.id === car_id);
  }

  async getAllAvailable({
    name,
    brand,
    category_id
  }) {
    const cars = this.cars.filter(car => {
      if (car.available === true || name && car.name === name || brand && car.brand === brand || category_id && car.category_id === category_id) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async updateStatus({
    id,
    available
  }) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    const car = this.cars[findIndex];

    if (car) {
      car.available = available;
      return car;
    }

    return null;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;