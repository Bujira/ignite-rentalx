/* eslint-disable prettier/prettier */
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
  ) { }
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentingTime = 24;

    const carUnavailable = await this.rentalsRepository.getRentalAvailabilityByCar({ car_id });
    // It would be better to check if the car property available is false from the CarsRepository
    // A car can have a history of rentals, so maybe a rental is a already over and the function getRentalAvailabilityByCar
    // would still find the id in the repository even if the car is available now

    if (carUnavailable) {
      throw new AppError("Car is currently being rented!", 400);
    }

    const userCurrentlyRenting = await this.rentalsRepository.getRentalAvailabilityByUser({ user_id });
    // It would be better if the table user had a column named currentlyRenting set for true or false
    // Here you should check if the property user.currentlyRenting is set to true
    // then the user should not be able to rent a car while he is already renting one

    if (userCurrentlyRenting) {
      throw new AppError("User is currently renting a car!", 400);
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if (compare < minimumRentingTime) {
      throw new AppError("Rental must have a duration of at least 24 hours", 400);
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
