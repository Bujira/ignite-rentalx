"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let carsRepository;
let createCarUseCase;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepository);
  });
  it("Should be able to register a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test - Create Car Name",
      description: "Test - Create Car Description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 60,
      brand: "Test - Create Car Brand",
      category_id: "Test - Create Car Category"
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to register more than one car with same license plate", async () => {
    await createCarUseCase.execute({
      name: "Test - Create Car Name A",
      description: "Test - Create Car Description A",
      daily_rate: 100,
      license_plate: "AAA123",
      fine_amount: 60,
      brand: "Test - Create Car Brand A",
      category_id: "Test - Create Car Category A"
    });
    await expect(createCarUseCase.execute({
      name: "Test - Create Car Name B",
      description: "Test - Create Car Description B",
      daily_rate: 200,
      license_plate: "AAA123",
      fine_amount: 120,
      brand: "Test - Create Car Brand B",
      category_id: "Test - Create Car Category B"
    })).rejects.toEqual(new _AppError.AppError("Car already exists!"));
  });
  it("A car should be registered as available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test - Create Car Name",
      description: "Test - Create Car Description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 60,
      brand: "Test - Create Car Brand",
      category_id: "Test - Create Car Category"
    });
    expect(car.available).toBe(true);
  });
});