import { User } from "../infra/typeorm/entities/User";
import { ICreateUserDTO } from "../typings/ICreateUserDTO";
import { IGetUserByEmailDTO } from "../typings/IGetUserByEmailDTO";
import { IGetUserByIdDTO } from "../typings/IGetUserByIdDTO";

interface IUsersRepository {
  create({
    id,
    name,
    password,
    email,
    drivers_license,
    avatar,
  }: ICreateUserDTO): Promise<User>;
  getByEmail({ email }: IGetUserByEmailDTO): Promise<User>;
  getById({ id }: IGetUserByIdDTO): Promise<User>;
}

export { IUsersRepository };
