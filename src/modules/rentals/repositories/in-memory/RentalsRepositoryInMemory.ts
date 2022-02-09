import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/typings/ICreateRentalDTO";
import { IGetRentalAvailabilityByCarDTO } from "@modules/rentals/typings/IGetRentalByCarDTO";
import { IGetRentalAvailabilityByUserDTO } from "@modules/rentals/typings/IGetRentalByUserDTO";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
    });

    this.rentals.push(rental);

    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id,
  }: IGetRentalAvailabilityByCarDTO): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );

    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id,
  }: IGetRentalAvailabilityByUserDTO): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );

    return rental;
  }
}

export { RentalsRepositoryInMemory };
