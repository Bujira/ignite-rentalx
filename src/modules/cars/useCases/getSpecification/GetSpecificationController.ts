import { Request, Response } from "express";

import { GetSpecificationUseCase } from "./GetSpecificationUseCase";

class GetSpecificationController {
  constructor(private getSpecificationUseCase: GetSpecificationUseCase) {
    console.log(".");
  }

  handle(request: Request, response: Response): Response {
    const result = this.getSpecificationUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetSpecificationController };
