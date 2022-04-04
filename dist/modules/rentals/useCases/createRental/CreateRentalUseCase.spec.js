"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rentalsRepository;
let dayjsDateProvider;
let carsRepository;
let createRentalUseCase;
describe("Create Rental", () => {
  const add24hrs = (0, _dayjs.default)().add(1, "day").toDate();
  const lessThan24hrs = (0, _dayjs.default)().toDate();
  beforeEach(() => {
    rentalsRepository = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepository, dayjsDateProvider, carsRepository);
  });
  it("Should create a rental for a specific car", async () => {
    const car = await carsRepository.create({
      name: "Test - Create Car Name",
      description: "Test - Create Car Description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 60,
      brand: "Test - Create Car Brand",
      category_id: "Test - Create Car Category"
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "Test - User ID",
      expected_return_date: add24hrs
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to rent a car that is already being rented", async () => {
    await rentalsRepository.create({
      car_id: "Test - Car ID",
      user_id: "Test - User ID",
      expected_return_date: add24hrs
    });
    await expect(createRentalUseCase.execute({
      car_id: "Test - Car ID",
      user_id: "Test - User ID 2",
      expected_return_date: add24hrs
    })).rejects.toEqual(new _AppError.AppError("Car is currently being rented!"));
  });
  it("Should not be able to rent a car if the user is already renting one", async () => {
    await rentalsRepository.create({
      car_id: "Test - Car ID 1",
      user_id: "Test - User ID",
      expected_return_date: add24hrs
    });
    await expect(createRentalUseCase.execute({
      car_id: "Test - Car ID 2",
      user_id: "Test - User ID",
      expected_return_date: add24hrs
    })).rejects.toEqual(new _AppError.AppError("User is currently renting a car!"));
  });
  it("Should not be able to rent a car for less than 24hrs", async () => {
    await expect(createRentalUseCase.execute({
      car_id: "Test - Car ID",
      user_id: "Test - User ID",
      expected_return_date: lessThan24hrs
    })).rejects.toEqual(new _AppError.AppError("Rental must have a duration of at least 24 hours"));
  });
});