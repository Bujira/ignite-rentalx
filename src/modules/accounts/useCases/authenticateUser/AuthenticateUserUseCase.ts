/* eslint-disable prettier/prettier */
import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import {
  IAuthenticateRequest,
  IAuthenticateResponse,
} from "../../typings/IAuthenticate";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }
  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.getByEmail({ email });
    const {
      token_secret,
      token_expiration,
      refresh_token_secret,
      refresh_token_expiration,
      refresh_token_expiration_in_days
    } = auth;

    if (!user) {
      throw new AppError("Invalid user or password!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid user or password!");
    }

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: token_expiration,
    });

    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expiration,
    });

    const expiration_date = this.dateProvider.addDays(refresh_token_expiration_in_days)

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expiration_date
    })

    const tokenReturn: IAuthenticateResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
