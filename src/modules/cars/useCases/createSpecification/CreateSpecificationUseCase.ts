import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {
    console.log(".");
  }
  execute({ name, description }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists = this.specificationRepository.getByName({
      name,
    });

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    const result = this.specificationRepository.create({ name, description });

    return result;
  }
}

export { CreateSpecificationUseCase };
