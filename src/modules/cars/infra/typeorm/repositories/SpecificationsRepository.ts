import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
  IGetSpecificationByNameDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { IGetSpecificationsByIds } from "@modules/cars/typings/IGetSpeciticationsByIdsDTO";
import { getRepository, Repository, TreeChildren } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async getByName({
    name,
  }: IGetSpecificationByNameDTO): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async getByIds({ ids }: IGetSpecificationsByIds): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);

    return specifications;
  }

  async getAll(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }
}

export { SpecificationsRepository };
