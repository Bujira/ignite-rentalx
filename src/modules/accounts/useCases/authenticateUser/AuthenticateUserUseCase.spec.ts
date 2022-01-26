import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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
    expect(async () => {
      await createUserUseCase.execute({
        name: "John Doe",
        email: "john@doe.com",
        password: "1234",
        drivers_license: "123456789",
      });

      await authenticateUserUseCase.execute({
        email: "joao@doe.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an user with invalid password", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "John Doe",
        email: "john@doe.com",
        password: "1234",
        drivers_license: "123456789",
      });

      await authenticateUserUseCase.execute({
        email: "john@doe.com",
        password: "0000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
