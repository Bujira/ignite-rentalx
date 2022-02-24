/* eslint-disable prettier/prettier */
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }
  async execute({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.getByName({
      name,
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!", 400);
    }

    const result = await this.categoriesRepository.create({
      name,
      description,
    });

    return result;
  }
}

export { CreateCategoryUseCase };
