import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationsUseCase: CreateSpecificationUseCase) {
    console.log(".");
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const result = await this.createSpecificationsUseCase.execute({
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
