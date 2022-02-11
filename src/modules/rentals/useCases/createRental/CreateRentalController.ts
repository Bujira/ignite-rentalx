import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { car_id, expected_return_date } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const result = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date,
    });

    console.log("controller!!!");

    return response.status(201).json({ message: "Success!", result });
  }
}

export { CreateRentalController };
