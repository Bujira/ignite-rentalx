"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

describe("Create Category", () => {
  let createCategoryUseCase;
  let categoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new car category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Test - Create Category Name",
      description: "Test - Create Category Description"
    });
    expect(category).toHaveProperty("id");
  });
  it("Should not be able to create an existing car category", async () => {
    await createCategoryUseCase.execute({
      name: "Test - Create Category Name",
      description: "Test - Create Category Description"
    });
    await expect(createCategoryUseCase.execute({
      name: "Test - Create Category Name",
      description: "Test - Create Category Description"
    })).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
});