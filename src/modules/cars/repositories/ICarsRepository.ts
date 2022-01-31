import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../typings/ICreateCarDTO";

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
}

export { ICarsRepository };
