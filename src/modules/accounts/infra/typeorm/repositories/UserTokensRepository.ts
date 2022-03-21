import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { ICreateUserTokenDTO } from "@modules/accounts/typings/ICreateUserTokenDTO";
import { IDeleteTokenByIdDTO } from "@modules/accounts/typings/IDeleteTokenByIdDTO";
import { IGetTokenByUserIdAndRefreshTokenDTO } from "@modules/accounts/typings/IGetTokenByUserIdAndRefreshTokenDTO";
import { IGetUserTokenByRefreshTokenDTO } from "@modules/accounts/typings/IGetUserTokenByRefreshTokenDTO";
import { getRepository, Repository } from "typeorm";

import { UserToken } from "../entities/UserToken";

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = getRepository("UserToken");
  }

  async create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expiration_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async getByUserIdAndByRefreshToken({
    user_id,
    token,
  }: IGetTokenByUserIdAndRefreshTokenDTO): Promise<UserToken> {
    return this.repository.findOne({
      user_id,
      refresh_token: token,
    });
  }

  async getByRefreshToken({
    token,
  }: IGetUserTokenByRefreshTokenDTO): Promise<UserToken> {
    return this.repository.findOne({ refresh_token: token });
  }

  async deleteById({ token_id }: IDeleteTokenByIdDTO): Promise<void> {
    await this.repository.delete({ id: token_id });
  }
}

export { UserTokensRepository };
