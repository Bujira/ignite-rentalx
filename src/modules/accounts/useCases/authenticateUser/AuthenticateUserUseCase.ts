import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {
  IAuthenticateRequest,
  IAuthenticateResponse,
} from "../../typings/IAuthenticate";

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    console.log(".");
  }
  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.getByEmail({ email });

    if (!user) {
      throw new AppError("Invalid user or password!");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid user or password");
    }

    const token = sign({}, "22cc62deef066466c6ff6ef9385cdbb6", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IAuthenticateResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUseCase };
