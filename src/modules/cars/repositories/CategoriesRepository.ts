import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IGetCategoryByNameDTO,
} from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  getByName({ name }: IGetCategoryByNameDTO) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  getAll(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
