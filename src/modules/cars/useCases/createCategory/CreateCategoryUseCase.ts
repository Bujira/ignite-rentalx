import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    console.log(".");
  }
  execute({ name, description }: ICreateCategoryDTO): Category {
    const categoryAlreadyExists = this.categoriesRepository.getByName({ name });

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    const result = this.categoriesRepository.create({ name, description });

    return result;
  }
}

export { CreateCategoryUseCase };
