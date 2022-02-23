import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetRentalByUserUseCase } from "./GetRentalByUserUseCase";

class GetRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getRentalByUserUseCase = container.resolve(GetRentalByUserUseCase);

    const result = await getRentalByUserUseCase.execute({
      user_id: id,
    });

    return response.status(200).json({ message: "Success!", result });
  }
}

export { GetRentalByUserController };
