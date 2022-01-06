import { Request, Response } from "express";

import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  constructor(private getCategoryUseCase: GetCategoryUseCase) {
    console.log(".");
  }

  handle(request: Request, response: Response): Response {
    const result = this.getCategoryUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetCategoryController };
