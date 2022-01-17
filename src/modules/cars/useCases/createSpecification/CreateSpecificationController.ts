import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const result = await createSpecificationsUseCase.execute({
      name,
      description,
    });

    return response.status(201).json({
      message: "Success!",
      result,
    });
  }
}

export { CreateSpecificationController };
