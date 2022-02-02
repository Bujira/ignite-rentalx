import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCarUseCase } from "./GetCarUseCase";

class GetCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const getCarUseCase = container.resolve(GetCarUseCase);

    const result = await getCarUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.status(200).json({
      message: "Success!",
      result,
    });
  }
}

export { GetCarController };
