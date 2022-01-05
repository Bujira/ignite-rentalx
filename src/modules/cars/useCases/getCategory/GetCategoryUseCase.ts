import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class GetCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    console.log();
  }

  execute() {
    const result = this.categoriesRepository.getAll();

    return result;
  }
}

export { GetCategoryUseCase };
