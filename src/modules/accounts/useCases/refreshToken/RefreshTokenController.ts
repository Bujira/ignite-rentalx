import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.query.token ||
      request.headers["x-access-token"] ||
      request.body.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const result = await refreshTokenUseCase.execute({ token });

    return response.status(201).json({ message: "Success!", result });
  }
}

export { RefreshTokenController };
