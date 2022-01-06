import { categoriesRepository } from "..";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
