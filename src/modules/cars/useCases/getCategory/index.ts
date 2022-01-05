import { categoriesRepository } from "..";

import { GetCategoryController } from "./GetCategoryController";
import { GetCategoryUseCase } from "./GetCategoryUseCase";

const getCategoryUseCase = new GetCategoryUseCase(categoriesRepository);

const getCategoryController = new GetCategoryController(getCategoryUseCase);

export { getCategoryController };
