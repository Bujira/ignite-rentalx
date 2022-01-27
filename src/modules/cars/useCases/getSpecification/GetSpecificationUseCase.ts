/* eslint-disable prettier/prettier */
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";


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
