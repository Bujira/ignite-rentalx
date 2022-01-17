import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { GetSpecificationController } from "../modules/cars/useCases/getSpecification/GetSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const getSpecificationController = new GetSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", getSpecificationController.handle);

export { specificationsRoutes };
