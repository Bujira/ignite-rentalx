import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { GetCarUseCase } from "./GetCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let getCarUseCase: GetCarUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    getCarUseCase = new GetCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Test - Create Car Name 1",
      description: "Test - Create Car Description 1",
      daily_rate: 100,
      license_plate: "Test - Create Car License Plate 1",
      fine_amount: 50,
      brand: "Test - Create Car Brand 1",
      category_id: "Test - Create Car Category 1",
    });
    await carsRepositoryInMemory.create({
      name: "Test - Create Car Name 2",
      description: "Test - Create Car Description 2",
      daily_rate: 200,
      license_plate: "Test - Create Car License Plate 2",
      fine_amount: 100,
      brand: "Test - Create Car Brand 2",
      category_id: "Test - Create Car Category 2",
    });
    const cars = await getCarUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  // it("Should be able to list all cars with provided name", async () => {
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name 1",
  //     description: "Test - Create Car Description 1",
  //     daily_rate: 100,
  //     license_plate: "Test - Create Car License Plate 1",
  //     fine_amount: 50,
  //     brand: "Test - Create Car Brand 1",
  //     category_id: "Test - Create Car Category 1",
  //   });
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name 2",
  //     description: "Test - Create Car Description 2",
  //     daily_rate: 200,
  //     license_plate: "Test - Create Car License Plate 2",
  //     fine_amount: 100,
  //     brand: "Test - Create Car Brand 2",
  //     category_id: "Test - Create Car Category 2",
  //   });
  //   await carsRepositoryInMemory.create({
  //     name: "Test - Create Car Name 1",
  //     description: "Test - Create Car Description",
  //     daily_rate: 200,
  //     license_plate: "Test - Create Car License Plate",
  //     fine_amount: 100,
  //     brand: "Test - Create Car Brand",
  //     category_id: "Test - Create Car Category",
  //   });
  //   const cars = await getCarUseCase.execute({
  //     name: "Test - Create Car Name 1",
  //   });

  //   expect(cars).toHaveLength(2);
  // });
});
