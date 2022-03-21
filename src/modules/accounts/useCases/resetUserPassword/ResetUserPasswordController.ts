import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    const result = await resetUserPasswordUseCase.execute({
      token: String(token),
      password,
    });

    return response.status(200).json({ messsage: "Success!", result });
  }
}

export { ResetUserPasswordController };
