import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    console.log(".");
  }

  async execute({
    name,
    username,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      username,
      password,
      email,
      drivers_license,
    });
    return user;
  }
}

export { CreateUserUseCase };
