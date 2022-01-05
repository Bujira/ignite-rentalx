import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { getCategoryController } from "../modules/cars/useCases/getCategory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return getCategoryController.handle(request, response);
});

export { categoriesRoutes };
