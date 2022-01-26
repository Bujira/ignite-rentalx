/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
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
