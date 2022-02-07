import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IUploadCarImageDTO } from "@modules/cars/typings/IUploadCarImageDTO";
import { getRepository, Repository } from "typeorm";

import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({ image_name, car_id }: IUploadCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
