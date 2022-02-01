import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../typings/ICreateCarDTO";
import { IGetByLicensePlateDTO } from "../typings/IGetByLicensePlateDTO";
import { IGetCarDTO } from "../typings/IGetCarDTO";

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;
  getByLicensePlate({ license_plate }: IGetByLicensePlateDTO): Promise<Car>;
  getAllAvailable({ name, brand, category_id }: IGetCarDTO): Promise<Car[]>;
}

export { ICarsRepository };
