import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

describe("Send Forgot Password Mail", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to an user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    const user = await usersRepositoryInMemory.create({
      name: "Stella Campbell",
      email: "ec@hu.tr",
      password: "12345",
      drivers_license: "2494335135",
    });

    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password email to a non existing user", async () => {
    expect(async () => {
      await usersRepositoryInMemory.create({
        name: "Carlos Pope",
        email: "gognaoge@tes.lt",
        password: "12345",
        drivers_license: "2288130853",
      });

      await sendForgotPasswordMailUseCase.execute({ email: "gumav@re.tv" });
    }).rejects.toEqual(new AppError("User does not exist!", 404));
  });

  it("Should be able to create a refresh token for the request", async () => {
    const createToken = jest.spyOn(userTokensRepositoryInMemory, "create");

    const user = await usersRepositoryInMemory.create({
      name: "Richard Nguyen",
      email: "ru@gozihajo.as",
      password: "12345",
      drivers_license: "3611423834",
    });

    await sendForgotPasswordMailUseCase.execute({ email: user.email });

    expect(createToken).toHaveBeenCalled();
  });
});
