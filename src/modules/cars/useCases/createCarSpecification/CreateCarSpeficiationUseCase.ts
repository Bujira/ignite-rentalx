/* eslint-disable prettier/prettier */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarSpecificationDTO } from "@modules/cars/typings/ICreateCarSpecificationDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }
  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationDTO): Promise<void> {
    const car = this.carsRepository.getById({ car_id });

    if (!car) {
      throw new AppError("Car does not exist!", 404)
    }
  }
}

export { CreateCarSpecificationUseCase };
