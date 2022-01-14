import { Request, Response } from "express";

import { GetSpecificationUseCase } from "./GetSpecificationUseCase";

class GetSpecificationController {
  constructor(private getSpecificationUseCase: GetSpecificationUseCase) {
    console.log(".");
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.getSpecificationUseCase.execute();
    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetSpecificationController };
