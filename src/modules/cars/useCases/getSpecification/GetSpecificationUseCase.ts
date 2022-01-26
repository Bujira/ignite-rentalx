/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
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
