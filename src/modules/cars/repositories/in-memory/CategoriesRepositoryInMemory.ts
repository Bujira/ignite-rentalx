import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IGetCategoryByNameDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }
  async getByName({ name }: IGetCategoryByNameDTO): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async getAll(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }
}

export { CategoriesRepositoryInMemory };
