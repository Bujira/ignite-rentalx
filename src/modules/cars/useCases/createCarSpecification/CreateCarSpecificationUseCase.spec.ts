import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpeficiationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
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

    const specification = await specificationsRepositoryInMemory.create({
      name: "Test - Specification Name",
      description: "Test - Specification Description",
    });

    const car_id = car.id;
    const specifications_id = [specification.id];

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(updatedCar).toHaveProperty("specifications");
    expect(updatedCar.specifications).toHaveLength(1);
  });

  it("Should not be able to add specifications to a non existing car", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "Test - Car ID",
        specifications_id: [
          "Test - Specification ID 1",
          "Test - Specification ID 2",
          "Test - Specification ID 3",
        ],
      })
    ).rejects.toEqual(new AppError("Car does not exist!", 404));
  });
});
