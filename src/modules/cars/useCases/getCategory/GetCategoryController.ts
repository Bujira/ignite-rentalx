import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getCategoryUseCase = container.resolve(GetCategoryUseCase);
    const result = await getCategoryUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetCategoryController };
