/* eslint-disable prettier/prettier */
import { Specification } from "@modules/cars/entities/Specification";
import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

@injectable()
class GetSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) { }

  async execute(): Promise<Specification[]> {
    const result = await this.specificationsRepository.getAll();

    return result;
  }
}

export { GetSpecificationUseCase };
