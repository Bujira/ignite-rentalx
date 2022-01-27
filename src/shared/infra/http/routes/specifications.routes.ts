import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { GetSpecificationController } from "@modules/cars/useCases/getSpecification/GetSpecificationController";
import { Router } from "express";

import { ensureAutehnticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const getSpecificationController = new GetSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAutehnticated,
  createSpecificationController.handle
);

specificationsRoutes.get("/", getSpecificationController.handle);

export { specificationsRoutes };
