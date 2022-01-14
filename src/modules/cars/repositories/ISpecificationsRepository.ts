import { Category } from "../entities/Category";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface IGetSpecificationByNameDTO {
  name: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Category;
  getByName({ name }: IGetSpecificationByNameDTO): Category;
  getAll(): Category[];
}

export {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
  IGetSpecificationByNameDTO,
};
