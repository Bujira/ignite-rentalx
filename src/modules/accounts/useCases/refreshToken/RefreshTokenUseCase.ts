/* eslint-disable prettier/prettier */
import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IRefreshTokenDTO } from "@modules/accounts/typings/IRefreshTokenDTO";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}


@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }
  async execute({ token }: IRefreshTokenDTO): Promise<string> {
    const { sub, email } = verify(token, auth.refresh_token_secret) as IPayload;

    const user_id = sub;

    const userToken = await this.userTokensRepository.getByUserIdAndByRefreshToken({ user_id, token });

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!", 404);
    }

    await this.userTokensRepository.deleteById({ token_id: userToken.id });

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user_id,
      expiresIn: auth.refresh_token_expiration,
    });

    const expiration_date = this.dateProvider.addDays(auth.refresh_token_expiration_in_days)

    await this.userTokensRepository.create({
      user_id,
      refresh_token,
      expiration_date
    })

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
