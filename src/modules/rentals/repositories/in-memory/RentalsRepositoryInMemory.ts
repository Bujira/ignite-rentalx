import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/typings/ICreateRentalDTO";
import { IGetRentalAvailabilityByCarDTO } from "@modules/rentals/typings/IGetRentalByCarDTO";
import { IGetRentalByIdDTO } from "@modules/rentals/typings/IGetRentalByIdDTO";
import { IGetRentalAvailabilityByUserDTO } from "@modules/rentals/typings/IGetRentalByUserDTO";
import { IGetRentalsByUserDTO } from "@modules/rentals/typings/IGetRentalsByUserDTO";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      start_date: new Date(),
      total,
    });

    this.rentals.push(rental);

    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id,
  }: IGetRentalAvailabilityByCarDTO): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id,
  }: IGetRentalAvailabilityByUserDTO): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async getById({ id }: IGetRentalByIdDTO): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async getAllByUser({ user_id }: IGetRentalsByUserDTO): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      (rentals) => rentals.user_id === user_id
    );

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
