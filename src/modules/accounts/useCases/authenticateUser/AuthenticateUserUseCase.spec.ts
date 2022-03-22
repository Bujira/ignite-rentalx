import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789",
    });

    const token = await authenticateUserUseCase.execute({
      email: "john@doe.com",
      password: "1234",
    });

    expect(token).toHaveProperty("token");
  });

  it("Should not be able to authenticate an user with invalid email", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "joao@doe.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Invalid user or password!"));
  });

  it("Should not be able to authenticate an user with invalid password", async () => {
    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "1234",
      drivers_license: "123456789",
    });
    await expect(
      authenticateUserUseCase.execute({
        email: "john@doe.com",
        password: "0000",
      })
    ).rejects.toEqual(new AppError("Invalid user or password!"));
  });
});
