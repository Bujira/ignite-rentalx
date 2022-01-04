import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface IGetCategoryDTO {
  name: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
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

  getByName({ name }: IGetCategoryDTO) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  getAll(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
