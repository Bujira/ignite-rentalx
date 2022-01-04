import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) { }
  execute({ name, description }: ICreateCategoryDTO) {
    const categoryAlreadyExists = this.categoriesRepository.getByName({ name });

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    const result = this.categoriesRepository.create({ name, description });

    return result;
  }
}

export { CreateCategoryService };
