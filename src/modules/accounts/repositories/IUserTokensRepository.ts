import { UserToken } from "../infra/typeorm/entities/UserToken";
import { ICreateUserTokenDTO } from "../typings/ICreateUserTokenDTO";
import { IDeleteTokenByIdDTO } from "../typings/IDeleteTokenByIdDTO";
import { IGetTokenByUserIdAndRefreshTokenDTO } from "../typings/IGetTokenByUserIdAndRefreshTokenDTO";
import { IGetUserTokenByRefreshTokenDTO } from "../typings/IGetUserTokenByRefreshTokenDTO";

interface IUserTokensRepository {
  create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  getByUserIdAndByRefreshToken({
    user_id,
    token,
  }: IGetTokenByUserIdAndRefreshTokenDTO): Promise<UserToken>;
  getByRefreshToken({
    token,
  }: IGetUserTokenByRefreshTokenDTO): Promise<UserToken>;
  deleteById({ token_id }: IDeleteTokenByIdDTO): Promise<void>;
}

export { IUserTokensRepository };
