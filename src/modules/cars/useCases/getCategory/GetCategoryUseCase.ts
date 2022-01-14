import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class GetCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    console.log(".");
  }

  async execute(): Promise<Category[]> {
    const result = await this.categoriesRepository.getAll();

    return result;
  }
}

export { GetCategoryUseCase };
