/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class GetCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute(): Promise<Category[]> {
    const result = await this.categoriesRepository.getAll();

    return result;
  }
}

export { GetCategoryUseCase };
