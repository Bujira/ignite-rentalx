/* eslint-disable prettier/prettier */
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  image_names: string[];
  car_id: string;
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepository,
    @inject("CarImagesRepository")
    private carImagesRepository: CarImagesRepository
  ) { }
  async execute({ image_names, car_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.getById({ car_id })

    if (!car) {
      throw new AppError("Car does not exist!", 404);
    }

    image_names.map(async (image) => {
      await this.carImagesRepository.create({
        image_name: image,
        car_id,
      })
    })
  }
}

export { UploadCarImageUseCase };
