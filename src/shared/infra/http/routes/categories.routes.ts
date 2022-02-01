import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { GetCategoryController } from "@modules/cars/useCases/getCategory/GetCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const getCategoryController = new GetCategoryController();

categoriesRoutes.post(
  "/",
  ensureAutehnticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", getCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAutehnticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
