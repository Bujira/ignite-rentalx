import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../typings/ICreateUserDTO";
import { IGetUserByEmailDTO } from "../../typings/IGetUserByEmailDTO";
import { IGetUserByIdDTO } from "../../typings/IGetUserByIdDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      drivers_license,
    });

    this.users.push(user);

    return user;
  }

  async getByEmail({ email }: IGetUserByEmailDTO): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async getById({ id }: IGetUserByIdDTO): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
