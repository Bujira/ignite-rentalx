import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { GetCategoryController } from "@modules/cars/useCases/getCategory/GetCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { Router } from "express";
import multer from "multer";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const getCategoryController = new GetCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", getCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
