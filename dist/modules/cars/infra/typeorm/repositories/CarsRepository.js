"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }) {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications
    });
    await this.repository.save(car);
    return car;
  }

  async getByLicensePlate({
    license_plate
  }) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async getById({
    car_id
  }) {
    const car = await this.repository.findOne({
      id: car_id
    });
    return car;
  }

  async getAllAvailable({
    name,
    brand,
    category_id
  }) {
    const carsQuery = this.repository.createQueryBuilder().where("available = :available", {
      available: true
    });

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async updateStatus({
    id,
    available
  }) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
    const car_id = id;
    const car = this.getById({
      car_id
    });
    return car;
  }

}

exports.CarsRepository = CarsRepository;