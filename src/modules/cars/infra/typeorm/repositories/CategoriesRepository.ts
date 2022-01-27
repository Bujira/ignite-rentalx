import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IGetCategoryByNameDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);

    return category;
  }

  async getByName({ name }: IGetCategoryByNameDTO): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }
}

export { CategoriesRepository };
