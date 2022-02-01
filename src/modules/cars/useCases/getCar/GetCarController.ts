import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCarUseCase } from "./GetCarUseCase";

class GetCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const result = container.resolve(GetCarUseCase);

    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetCarController };
