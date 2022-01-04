import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface IGetCategoryByNameDTO {
  name: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Category;
  getByName({ name }: IGetCategoryByNameDTO): Category;
  getAll(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO, IGetCategoryByNameDTO };
