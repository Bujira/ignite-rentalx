/* eslint-disable prettier/prettier */
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICreateCarSpecificationDTO } from "@modules/cars/typings/ICreateCarSpecificationDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }
  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationDTO): Promise<Car> {
    const car = await this.carsRepository.getById({ car_id });

    if (!car) {
      throw new AppError("Car does not exist!", 404);
    }

    const specifications = await this.specificationsRepository.getByIds({ ids: specifications_id });

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
