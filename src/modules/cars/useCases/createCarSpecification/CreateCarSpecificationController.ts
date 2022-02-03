import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpeficiationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const result = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json({
      message: "Success!,",
      result,
    });
  }
}

export { CreateCarSpecificationController };
