import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { GetCarController } from "@modules/cars/useCases/getCar/GetCarController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const getCarController = new GetCarController();

carsRoutes.post(
  "/",
  ensureAutehnticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/", getCarController.handle);

export { carsRoutes };
