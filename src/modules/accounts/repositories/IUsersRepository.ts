import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IGetUserByEmailDTO } from "../dtos/IGetUserByEmailDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create({
    name,
    password,
    email,
    drivers_license,
    avatar,
  }: ICreateUserDTO): Promise<User>;
  getByEmail({ email }: IGetUserByEmailDTO): Promise<User>;
}

export { IUsersRepository };
