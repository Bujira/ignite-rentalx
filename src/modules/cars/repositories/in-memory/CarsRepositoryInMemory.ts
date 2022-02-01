import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/typings/ICreateCarDTO";
import { IGetByLicensePlateDTO } from "@modules/cars/typings/IGetByLicensePlateDTO";
import { IGetCarDTO } from "@modules/cars/typings/IGetCarDTO";

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
    });

    this.cars.push(car);

    return car;
  }

  async getByLicensePlate({
    license_plate,
  }: IGetByLicensePlateDTO): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
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
}

export { CarsRepositoryInMemory };
