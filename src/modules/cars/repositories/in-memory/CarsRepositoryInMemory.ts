import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/typings/ICreateCarDTO";
import { IGetByIdDTO } from "@modules/cars/typings/IGetByIdDTO";
import { IGetByLicensePlateDTO } from "@modules/cars/typings/IGetByLicensePlateDTO";
import { IGetCarDTO } from "@modules/cars/typings/IGetCarDTO";
import { IUpdateCarStatusDTO } from "@modules/cars/typings/IUpdateCarStatusDTO";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async getByLicensePlate({
    license_plate,
  }: IGetByLicensePlateDTO): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async getById({ car_id }: IGetByIdDTO): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async getAllAvailable({
    name,
    brand,
    category_id,
  }: IGetCarDTO): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }

  async updateStatus({ id, available }: IUpdateCarStatusDTO): Promise<Car> {
    const findIndex = this.cars.findIndex((car) => car.id === id);

    const car = this.cars[findIndex];

    if (car) {
      car.available = available;

      return car;
    }

    return null;
  }
}

export { CarsRepositoryInMemory };
