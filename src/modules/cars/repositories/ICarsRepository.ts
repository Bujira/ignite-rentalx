import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../typings/ICreateCarDTO";
import { IGetByIdDTO } from "../typings/IGetByIdDTO";
import { IGetByLicensePlateDTO } from "../typings/IGetByLicensePlateDTO";
import { IGetCarDTO } from "../typings/IGetCarDTO";
import { IUpdateCarStatusDTO } from "../typings/IUpdateCarStatusDTO";

interface ICarsRepository {
  create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car>;
  getByLicensePlate({ license_plate }: IGetByLicensePlateDTO): Promise<Car>;
  getById({ car_id }: IGetByIdDTO): Promise<Car>;
  getAllAvailable({ name, brand, category_id }: IGetCarDTO): Promise<Car[]>;
  updateStatus({ id, available }: IUpdateCarStatusDTO): Promise<Car>;
}

export { ICarsRepository };
