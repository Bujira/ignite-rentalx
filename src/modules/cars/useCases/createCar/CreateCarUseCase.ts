/* eslint-disable prettier/prettier */
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/typings/ICreateCarDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.getByLicensePlate({ license_plate });

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const result = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return result;
  }
}

export { CreateCarUseCase };
