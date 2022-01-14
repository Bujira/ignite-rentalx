import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
  IGetSpecificationByNameDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  getByName({ name }: IGetSpecificationByNameDTO): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  getAll(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationsRepository };
