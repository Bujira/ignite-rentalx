import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetSpecificationUseCase } from "./GetSpecificationUseCase";

class GetSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getSpecificationUseCase = container.resolve(GetSpecificationUseCase);
    const result = await getSpecificationUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetSpecificationController };
