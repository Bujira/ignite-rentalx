/* eslint-disable prettier/prettier */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/typings/ICreateRentalDTO";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) { }
  async execute({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentingTime = 24;

    const carUnavailable = await this.rentalsRepository.getRentalAvailabilityByCar({ car_id });

    if (carUnavailable) {
      throw new AppError("Car is currently being rented!", 400);
    }

    const userCurrentlyRenting = await this.rentalsRepository.getRentalAvailabilityByUser({ user_id });

    if (userCurrentlyRenting) {
      throw new AppError("User is currently renting a car!", 400);
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if (compare < minimumRentingTime) {
      throw new AppError("Rental must have a duration of at least 24 hours", 400);
    }

    const rental = await this.rentalsRepository.create({
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      total,
    });

    const available = false;

    await this.carsRepository.updateStatus({
      id: car_id,
      available,
    })

    return rental;
  }
}

export { CreateRentalUseCase };
