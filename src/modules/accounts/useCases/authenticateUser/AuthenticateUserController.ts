import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    const token = await authenticateUseCase.execute({ email, password });

    return response.status(200).json({ message: "Success!", token });
  }
}

export { AuthenticateUserController };
