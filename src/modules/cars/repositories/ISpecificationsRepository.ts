import { Specification } from "../infra/typeorm/entities/Specification";
import { IGetSpecificationsByIds } from "../typings/IGetSpeciticationsByIdsDTO";

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
  getByIds({ ids }: IGetSpecificationsByIds): Promise<Specification[]>;
  getAll(): Promise<Specification[]>;
}

export {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
  IGetSpecificationByNameDTO,
};
