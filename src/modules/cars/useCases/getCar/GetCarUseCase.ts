/* eslint-disable prettier/prettier */
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IGetCarDTO } from "@modules/cars/typings/IGetCarDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class GetCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }
  async execute({ name, brand, category_id }: IGetCarDTO): Promise<Car[]> {
    const cars = await this.carsRepository.getAllAvailable({ name, brand, category_id });

    return cars;
  }
}

export { GetCarUseCase };
