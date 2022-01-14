import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {
    console.log(".");
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategoryUseCase.execute({ file });

    return response.json({ messsage: "Success!" });
  }
}

export { ImportCategoryController };
