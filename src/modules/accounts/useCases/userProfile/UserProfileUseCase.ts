/* eslint-disable prettier/prettier */
import { UserMap } from "@modules/accounts/mappers/UserMaps";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserProfileDTO } from "@modules/accounts/typings/IUserProfileDTO";
import { IUserResponseDTO } from "@modules/accounts/typings/IUserResponseDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ id }: IUserProfileDTO): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.getById({ id });

    if (!user) {
      throw new AppError("User does not exist!", 404);
    }

    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
