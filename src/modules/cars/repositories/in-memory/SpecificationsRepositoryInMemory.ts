import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { IGetSpecificationsByIds } from "@modules/cars/typings/IGetSpeciticationsByIdsDTO";

import {
  ICreateSpecificationDTO,
  IGetSpecificationByNameDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async getByName({
    name,
  }: IGetSpecificationByNameDTO): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async getByIds({ ids }: IGetSpecificationsByIds): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }
  async getAll(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { SpecificationsRepositoryInMemory };
