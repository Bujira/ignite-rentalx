import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create({
    name,
    username,
    password,
    email,
    drivers_license,
  }: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };
