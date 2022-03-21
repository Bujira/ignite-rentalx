/* eslint-disable prettier/prettier */
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IResetUserPassword } from "@modules/accounts/typings/IResetUserPasswordDTO";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }
  async execute({ token, password }: IResetUserPassword): Promise<void> {
    const userToken = await this.userTokensRepository.getByRefreshToken({ token });

    if (!userToken) {
      throw new AppError("Token does not exist!", 404);
    }

    const dateNow = this.dateProvider.dateNow();
    const isTokenExpired = this.dateProvider.compareExpiration(userToken.expiration_date, dateNow);

    if (isTokenExpired) {
      throw new AppError("Token is expired!");
    }

    const id = userToken.user_id

    const user = await this.usersRepository.getById({ id });

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById({ token_id: userToken.id })
  }
}

export { ResetUserPasswordUseCase };
