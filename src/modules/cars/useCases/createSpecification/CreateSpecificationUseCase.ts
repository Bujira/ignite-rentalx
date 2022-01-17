import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {
    console.log(".");
  }
  async execute({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationRepository.getByName({
        name,
      });

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    const result = await this.specificationRepository.create({
      name,
      description,
    });

    return result;
  }
}

export { CreateSpecificationUseCase };
