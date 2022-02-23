/* eslint-disable prettier/prettier */
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IGetRentalsByUserDTO } from "@modules/rentals/typings/IGetRentalsByUserDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class GetRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) { }
  async execute({ user_id }: IGetRentalsByUserDTO): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.getAllByUser({ user_id });

    return rentals;
  }
}

export { GetRentalByUserUseCase };
