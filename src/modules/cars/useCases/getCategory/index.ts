import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { GetCategoryController } from "./GetCategoryController";
import { GetCategoryUseCase } from "./GetCategoryUseCase";

export default (): GetCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const getCategoryUseCase = new GetCategoryUseCase(categoriesRepository);

  const getCategoryController = new GetCategoryController(getCategoryUseCase);

  return getCategoryController;
};
