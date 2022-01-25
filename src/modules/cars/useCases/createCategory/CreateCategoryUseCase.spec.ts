import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new car category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Test - Create Category Name",
      description: "Test - Create Category Description",
    });

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create an existing car category", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Test - Create Category Name",
        description: "Test - Create Category Description",
      });

      await createCategoryUseCase.execute({
        name: "Test - Create Category Name",
        description: "Test - Create Category Description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
