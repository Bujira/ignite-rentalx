import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, drivers_license, avatar } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const result = await createUserUseCase.execute({
      name,
      password,
      email,
      drivers_license,
      avatar,
    });

    return response.status(201).json({ message: "Success!", result });
  }
}

export { CreateUserController };
