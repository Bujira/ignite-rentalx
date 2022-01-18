import { User } from "../entities/User";
import { ICreateUserDTO } from "../typings/ICreateUserDTO";
import { IGetUserByEmailDTO } from "../typings/IGetUserByEmailDTO";

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
