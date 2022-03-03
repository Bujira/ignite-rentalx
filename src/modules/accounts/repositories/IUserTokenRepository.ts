import { UserToken } from "../infra/typeorm/entities/UserToken";
import { ICreateUserTokenDTO } from "../typings/ICreateUserTokenDTO";

interface IUserTokenRepository {
  create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUserTokenRepository };
