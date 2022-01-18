import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      drivers_license,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
