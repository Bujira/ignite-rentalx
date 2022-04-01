import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../typings/IUserResponseDTO";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    drivers_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      drivers_license,
      avatar,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
