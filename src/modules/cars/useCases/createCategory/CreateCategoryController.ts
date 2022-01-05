import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    console.log();
  }
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const result = this.createCategoryUseCase.execute({ name, description });

    return response.status(201).json({
      message: "Success!",
      result,
    });
  }
}

export { CreateCategoryController };
