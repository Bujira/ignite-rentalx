import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface IGetSpecificationByNameDTO {
  name: string;
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  getByName({ name }: IGetSpecificationByNameDTO): Promise<Specification>;
  getAll(): Promise<Specification[]>;
}

export {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
  IGetSpecificationByNameDTO,
};
