import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it("Should create a rental for a specific car", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "Test - Car ID",
      user_id: "Test - User ID",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to rent a car that is already being rented", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "Test - Car ID",
        user_id: "Test - User ID 1",
        expected_return_date: new Date(),
      });
      await createRentalUseCase.execute({
        car_id: "Test - Car ID",
        user_id: "Test - User ID 2",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to rent a car if the user is already renting one", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "Test - Car ID 1",
        user_id: "Test - User ID",
        expected_return_date: new Date(),
      });
      await createRentalUseCase.execute({
        car_id: "Test - Car ID 2",
        user_id: "Test - User ID",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
