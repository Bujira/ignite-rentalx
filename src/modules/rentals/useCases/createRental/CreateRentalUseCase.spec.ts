import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const add24hrs = dayjs().add(1, "day").toDate();
  const lessThan24hrs = dayjs().toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository
    );
  });

  it("Should create a rental for a specific car", async () => {
    const car = await carsRepository.create({
      name: "Test - Create Car Name",
      description: "Test - Create Car Description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 60,
      brand: "Test - Create Car Brand",
      category_id: "Test - Create Car Category",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "Test - User ID",
      expected_return_date: add24hrs,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to rent a car that is already being rented", async () => {
    await rentalsRepository.create({
      car_id: "Test - Car ID",
      user_id: "Test - User ID",
      expected_return_date: add24hrs,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: "Test - Car ID",
        user_id: "Test - User ID 2",
        expected_return_date: add24hrs,
      })
    ).rejects.toEqual(new AppError("Car is currently being rented!"));
  });

  it("Should not be able to rent a car if the user is already renting one", async () => {
    await rentalsRepository.create({
      car_id: "Test - Car ID 1",
      user_id: "Test - User ID",
      expected_return_date: add24hrs,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: "Test - Car ID 2",
        user_id: "Test - User ID",
        expected_return_date: add24hrs,
      })
    ).rejects.toEqual(new AppError("User is currently renting a car!"));
  });

  it("Should not be able to rent a car for less than 24hrs", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "Test - Car ID",
        user_id: "Test - User ID",
        expected_return_date: lessThan24hrs,
      })
    ).rejects.toEqual(
      new AppError("Rental must have a duration of at least 24 hours")
    );
  });
});
