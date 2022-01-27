import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface IGetCategoryByNameDTO {
  name: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  getByName({ name }: IGetCategoryByNameDTO): Promise<Category>;
  getAll(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO, IGetCategoryByNameDTO };
