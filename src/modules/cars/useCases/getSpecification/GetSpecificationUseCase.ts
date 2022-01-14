import { Specification } from "../../entities/Specification";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

class GetSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {
    console.log(".");
  }

  execute(): Specification[] {
    return this.specificationsRepository.getAll();
  }
}

export { GetSpecificationUseCase };
