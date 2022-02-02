import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpeficiationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to add new specifications to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test - Create Car Name",
      description: "Test - Create Car Description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 60,
      brand: "Test - Create Car Brand",
      category_id: "Test - Create Car Category",
    });
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [
        "Test - Specification ID 1",
        "Test - Specification ID 2",
        "Test - Specification ID 3",
      ],
    });
  });

  // it("Should not be able to add specifications to a non existing car", async () => {
  //   expect(async () => {
  //     await createCarSpecificationUseCase.execute({
  //       car_id: "Test - Car ID",
  //       specifications_id: [
  //         "Test - Specification ID 1",
  //         "Test - Specification ID 2",
  //         "Test - Specification ID 3",
  //       ],
  //     });
  //   }).rejects.toBeInstanceOf(AppError);
  // });
});
