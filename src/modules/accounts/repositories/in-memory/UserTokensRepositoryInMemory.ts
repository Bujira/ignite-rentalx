import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { ICreateUserTokenDTO } from "@modules/accounts/typings/ICreateUserTokenDTO";
import { IDeleteTokenByIdDTO } from "@modules/accounts/typings/IDeleteTokenByIdDTO";
import { IGetTokenByUserIdAndRefreshTokenDTO } from "@modules/accounts/typings/IGetTokenByUserIdAndRefreshTokenDTO";
import { IGetUserTokenByRefreshTokenDTO } from "@modules/accounts/typings/IGetUserTokenByRefreshTokenDTO";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserToken[] = [];
  async create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expiration_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async getByUserIdAndByRefreshToken({
    user_id,
    token,
  }: IGetTokenByUserIdAndRefreshTokenDTO): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id && userToken.refresh_token === token
    );
  }

  async getByRefreshToken({
    token,
  }: IGetUserTokenByRefreshTokenDTO): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === token
    );
  }

  async deleteById({ token_id }: IDeleteTokenByIdDTO): Promise<void> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.id === token_id
    );

    const deleteToken = this.userTokens.indexOf(userToken);

    this.userTokens.splice(deleteToken);
  }
}

export { UserTokensRepositoryInMemory };
