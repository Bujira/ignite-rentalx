import { Request, Response } from "express";

import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  constructor(private getCategoryUseCase: GetCategoryUseCase) {
    console.log(".");
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.getCategoryUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetCategoryController };
