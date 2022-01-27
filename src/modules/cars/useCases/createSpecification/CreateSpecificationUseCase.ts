/* eslint-disable prettier/prettier */
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

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
  ) { }
  async execute({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationRepository.getByName({
        name,
      });

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    const result = await this.specificationRepository.create({
      name,
      description,
    });

    return result;
  }
}

export { CreateSpecificationUseCase };
