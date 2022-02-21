import { Rental } from "../infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../typings/ICreateRentalDTO";
import { IGetRentalAvailabilityByCarDTO } from "../typings/IGetRentalByCarDTO";
import { IGetRentalByIdDTO } from "../typings/IGetRentalByIdDTO";
import { IGetRentalAvailabilityByUserDTO } from "../typings/IGetRentalByUserDTO";

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  getRentalAvailabilityByCar({
    car_id,
  }: IGetRentalAvailabilityByCarDTO): Promise<Rental>;
  getRentalAvailabilityByUser({
    user_id,
  }: IGetRentalAvailabilityByUserDTO): Promise<Rental>;
  getById({ id }: IGetRentalByIdDTO): Promise<Rental>;
}

export { IRentalsRepository };
