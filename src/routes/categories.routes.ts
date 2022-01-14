import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import getCategoryController from "../modules/cars/useCases/getCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return getCategoryController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };
