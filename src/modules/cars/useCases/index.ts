import { CategoriesRepository } from "../repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../repositories/implementations/SpecificationsRepository";

const specificationsRepository = new SpecificationsRepository();

const categoriesRepository = CategoriesRepository.getInstance();

export { categoriesRepository, specificationsRepository };
