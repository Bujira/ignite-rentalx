import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ReturnCarController } from "@modules/rentals/useCases/returnCar/ReturnCarController";
import { Router } from "express";

import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();

rentalsRoutes.post("/", ensureAutehnticated, createRentalController.handle);
rentalsRoutes.post(
  "/return/:rental_id",
  ensureAutehnticated,
  returnCarController.handle
);

export { rentalsRoutes };
