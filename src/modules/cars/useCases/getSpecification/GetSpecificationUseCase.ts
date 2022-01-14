import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

class GetSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {
    console.log(".");
  }

  async execute(): Promise<Specification[]> {
    const result = await this.specificationsRepository.getAll();

    return result;
  }
}

export { GetSpecificationUseCase };
