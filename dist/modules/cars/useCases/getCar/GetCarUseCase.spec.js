"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _GetCarUseCase = require("./GetCarUseCase");

let carsRepositoryInMemory;
let getCarUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    getCarUseCase = new _GetCarUseCase.GetCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Test - Create Car Name 1",
      description: "Test - Create Car Description 1",
      daily_rate: 100,
      license_plate: "Test - Create Car License Plate 1",
      fine_amount: 50,
      brand: "Test - Create Car Brand 1",
      category_id: "Test - Create Car Category 1"
    });
    await carsRepositoryInMemory.create({
      name: "Test - Create Car Name 2",
      description: "Test - Create Car Description 2",
      daily_rate: 200,
      license_plate: "Test - Create Car License Plate 2",
      fine_amount: 100,
      brand: "Test - Create Car Brand 2",
      category_id: "Test - Create Car Category 2"
    });
    const cars = await getCarUseCase.execute({});
    expect(cars).toHaveLength(2);
  }); // it("Should be able to list all cars with provided name", async () => {
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name A",
  //     description: "Test - Create Car Description A",
  //     daily_rate: 100,
  //     license_plate: "Test - Create Car License Plate A",
  //     fine_amount: 50,
  //     brand: "Test - Create Car Brand A",
  //     category_id: "Test - Create Car Category A",
  //   });
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name B",
  //     description: "Test - Create Car Description B",
  //     daily_rate: 200,
  //     license_plate: "Test - Create Car License Plate B",
  //     fine_amount: 100,
  //     brand: "Test - Create Car Brand B",
  //     category_id: "Test - Create Car Category B",
  //   });
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name A",
  //     description: "Test - Create Car Description C",
  //     daily_rate: 200,
  //     license_plate: "Test - Create Car License Plate C",
  //     fine_amount: 100,
  //     brand: "Test - Create Car Brand C",
  //     category_id: "Test - Create Car Category C",
  //   });
  //   const cars = await getCarUseCase.execute({
  //     name: "Test - Create Car Name B",
  //   });
  //   expect(cars).toHaveLength(1);
  // });
});