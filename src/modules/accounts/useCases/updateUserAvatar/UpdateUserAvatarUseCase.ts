/* eslint-disable prettier/prettier */
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

import { IUpdateUserAvatarDTO } from "../../typings/IUpdateUserAvatarDTO";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }
  async execute({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.getById({ id: user_id });

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    const result = await this.usersRepository.create(user);

    return result;
  }
}

export { UpdateUserAvatarUseCase };
