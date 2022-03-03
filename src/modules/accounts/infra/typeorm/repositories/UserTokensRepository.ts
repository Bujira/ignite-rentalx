import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { ICreateUserTokenDTO } from "@modules/accounts/typings/ICreateUserTokenDTO";
import { getRepository, Repository } from "typeorm";

import { UserToken } from "../entities/UserToken";

class UserTokensRepository implements IUserTokenRepository {
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
}

export { UserTokensRepository };
