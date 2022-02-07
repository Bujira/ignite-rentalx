/* eslint-disable prettier/prettier */
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  image_names: string[];
  car_id: string;
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: CarImagesRepository
  ) { }
  async execute({ image_names, car_id }: IRequest): Promise<void> {
    image_names.map(async (image) => {
      await this.carImagesRepository.create({
        image_name: image,
        car_id,
      })
    })
  }
}

export { UploadCarImageUseCase };
