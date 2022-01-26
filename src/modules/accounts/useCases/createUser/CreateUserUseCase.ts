/* eslint-disable prettier/prettier */
import { AppError } from "@errors/AppError";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../typings/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    password,
    email,
    drivers_license,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.getByEmail({ email });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      drivers_license,
      avatar,
    });

    return user;
  }
}

export { CreateUserUseCase };
