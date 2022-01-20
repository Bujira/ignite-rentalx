import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserAvatarDTO } from "../../typings/IUpdateUserAvatarDTO";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    console.log(".");
  }
  async execute({ user_id, avatar_file }: IUpdateUserAvatarDTO): Promise<User> {
    const user = await this.usersRepository.getById({ id: user_id });

    user.avatar = avatar_file;

    const result = await this.usersRepository.create(user);

    return result;
  }
}

export { UpdateUserAvatarUseCase };
