import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

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
    await createCategoryUseCase.execute({
      name: "Test - Create Category Name",
      description: "Test - Create Category Description",
    });
    await expect(
      createCategoryUseCase.execute({
        name: "Test - Create Category Name",
        description: "Test - Create Category Description",
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
