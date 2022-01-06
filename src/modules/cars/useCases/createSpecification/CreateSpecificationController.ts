import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationsUseCase: CreateSpecificationUseCase) {
    console.log(".");
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const result = this.createSpecificationsUseCase.execute({
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
