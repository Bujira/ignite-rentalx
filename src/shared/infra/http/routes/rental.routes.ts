import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { GetRentalByUserController } from "@modules/rentals/useCases/getRentalByUser/GetRentalByUserController";
import { ReturnCarController } from "@modules/rentals/useCases/returnCar/ReturnCarController";
import { Router } from "express";

import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();
const getRentalByUserController = new GetRentalByUserController();

rentalsRoutes.post("/", ensureAutehnticated, createRentalController.handle);
rentalsRoutes.post(
  "/return/:rental_id",
  ensureAutehnticated,
  returnCarController.handle
);
rentalsRoutes.get("/", ensureAutehnticated, getRentalByUserController.handle);

export { rentalsRoutes };
