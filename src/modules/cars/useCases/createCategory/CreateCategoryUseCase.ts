import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
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
  ) {
    console.log(".");
  }
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
