import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/typings/ICreateRentalDTO";
import { IGetRentalAvailabilityByCarDTO } from "@modules/rentals/typings/IGetRentalByCarDTO";
import { IGetRentalByIdDTO } from "@modules/rentals/typings/IGetRentalByIdDTO";
import { IGetRentalAvailabilityByUserDTO } from "@modules/rentals/typings/IGetRentalByUserDTO";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async getRentalAvailabilityByCar({
    car_id,
  }: IGetRentalAvailabilityByCarDTO): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rental;
  }

  async getRentalAvailabilityByUser({
    user_id,
  }: IGetRentalAvailabilityByUserDTO): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rental;
  }

  async getById({ id }: IGetRentalByIdDTO): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }
}

export { RentalsRepository };
