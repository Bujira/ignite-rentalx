/* eslint-disable prettier/prettier */
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { IUpdateUserAvatarDTO } from "../../typings/IUpdateUserAvatarDTO";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.getById({ id: user_id });

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    const result = await this.usersRepository.create(user);

    return result;
  }
}

export { UpdateUserAvatarUseCase };
