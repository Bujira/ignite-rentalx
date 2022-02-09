import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/typings/ICreateRentalDTO";
import { IGetRentalAvailabilityByCarDTO } from "@modules/rentals/typings/IGetRentalByCarDTO";
import { IGetRentalAvailabilityByUserDTO } from "@modules/rentals/typings/IGetRentalByUserDTO";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id,
  }: IGetRentalAvailabilityByCarDTO): Promise<Rental> {
    const rental = await this.repository.findOne(car_id);

    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id,
  }: IGetRentalAvailabilityByUserDTO): Promise<Rental> {
    const rental = await this.repository.findOne(user_id);

    return rental;
  }
}

export { RentalsRepository };
