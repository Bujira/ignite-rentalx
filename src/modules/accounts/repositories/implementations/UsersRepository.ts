import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../typings/ICreateUserDTO";
import { IGetUserByEmailDTO } from "../../typings/IGetUserByEmailDTO";
import { IGetUserByIdDTO } from "../../typings/IGetUserByIdDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    password,
    email,
    drivers_license,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      drivers_license,
      avatar,
    });

    await this.repository.save(user);

    return user;
  }

  async getByEmail({ email }: IGetUserByEmailDTO): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async getById({ id }: IGetUserByIdDTO): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export { UsersRepository };
