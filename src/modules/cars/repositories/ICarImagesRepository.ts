import { CarImage } from "../infra/typeorm/entities/CarImage";
import { IUploadCarImageDTO } from "../typings/IUploadCarImageDTO";

interface ICarImagesRepository {
  create({ image_name, car_id }: IUploadCarImageDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
