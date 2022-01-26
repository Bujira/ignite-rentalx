/* eslint-disable prettier/prettier */
import { AppError } from "@errors/AppError";
import { Category } from "@modules/cars/entities/Category";
import { inject, injectable } from "tsyringe";

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
      throw new AppError("Category already exists!");
    }

    const result = await this.categoriesRepository.create({
      name,
      description,
    });

    return result;
  }
}

export { CreateCategoryUseCase };
