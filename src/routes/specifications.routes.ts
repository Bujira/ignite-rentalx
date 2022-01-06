import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateEspecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateEspecificationService(
    specificationsRepository
  );

  const result = createSpecificationService.execute({ name, description });

  return response.status(201).json({
    message: "Success!",
    result,
  });
});

specificationsRoutes.get("/", (request, response) => {
  const result = specificationsRepository.getAll();
  return response.status(200).json({
    message: "Success!",
    result,
  });
});

export { specificationsRoutes };
