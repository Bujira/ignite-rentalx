import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { avatar_file } = request.body;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const result = await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(200).json({ message: "Success!", result });
  }
}

export { UpdateUserAvatarController };
