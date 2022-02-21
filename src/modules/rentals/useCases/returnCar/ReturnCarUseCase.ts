/* eslint-disable prettier/prettier */
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IReturnCarDTO } from "@modules/rentals/typings/IReturnCarDTO";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ReturnCarUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }
  async execute({ rental_id, user_id }: IReturnCarDTO) {
    const rental = await this.rentalsRepository.getById({ id: rental_id });
    const car = await this.carsRepository.getById({ car_id: rental.car_id })
    const minimunRentingDays = 1;

    if (!rental) {
      throw new AppError("Rental does not exist!", 404);
    }

    const dateNow = this.dateProvider.dateNow();

    let rentingDays = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (rentingDays <= 0) {
      rentingDays = minimunRentingDays;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculatedFine = delay * car.fine_amount;
      total = calculatedFine;
    }

    total += rentingDays * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);

    const { id } = car;
    const available = true;

    await this.carsRepository.updateStatus({
      id,
      available,
    });

    return rental;
  }
}

export { ReturnCarUseCase };
