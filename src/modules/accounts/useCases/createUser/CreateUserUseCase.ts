/* eslint-disable prettier/prettier */
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
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
