import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { GetCarController } from "@modules/cars/useCases/getCar/GetCarController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const getCarController = new GetCarController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  "/",
  ensureAutehnticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", getCarController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAutehnticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
