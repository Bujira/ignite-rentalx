import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";
import getSpecificationController from "../modules/cars/useCases/getSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController().handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  return getSpecificationController().handle(request, response);
});

export { specificationsRoutes };
