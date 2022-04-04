"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UserTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
let authenticateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
  });
  it("Should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789"
    });
    const token = await authenticateUserUseCase.execute({
      email: "john@doe.com",
      password: "1234"
    });
    expect(token).toHaveProperty("token");
  });
  it("Should not be able to authenticate an user with invalid email", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789"
    });
    await expect(authenticateUserUseCase.execute({
      email: "joao@doe.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Invalid user or password!"));
  });
  it("Should not be able to authenticate an user with invalid password", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789"
    });
    await expect(authenticateUserUseCase.execute({
      email: "john@doe.com",
      password: "0000"
    })).rejects.toEqual(new _AppError.AppError("Invalid user or password!"));
  });
});