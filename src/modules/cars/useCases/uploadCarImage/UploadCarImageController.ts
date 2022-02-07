import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const image_names = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      image_names,
      car_id: id,
    });

    return response.status(201).json({ message: "Success!" });
  }
}

export { UploadCarImageController };
