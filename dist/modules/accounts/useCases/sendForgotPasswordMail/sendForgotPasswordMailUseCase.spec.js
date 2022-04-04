"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UserTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _sendForgotPasswordMailUseCase = require("./sendForgotPasswordMailUseCase");

describe("Send Forgot Password Mail", () => {
  let usersRepositoryInMemory;
  let userTokensRepositoryInMemory;
  let dateProvider;
  let mailProvider;
  let sendForgotPasswordMailUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _sendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to an user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    const user = await usersRepositoryInMemory.create({
      name: "Stella Campbell",
      email: "ec@hu.tr",
      password: "12345",
      drivers_license: "2494335135"
    });
    await sendForgotPasswordMailUseCase.execute({
      email: user.email
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send a forgot password email to a non existing user", async () => {
    expect(async () => {
      await usersRepositoryInMemory.create({
        name: "Carlos Pope",
        email: "gognaoge@tes.lt",
        password: "12345",
        drivers_license: "2288130853"
      });
      await sendForgotPasswordMailUseCase.execute({
        email: "gumav@re.tv"
      });
    }).rejects.toEqual(new _AppError.AppError("User does not exist!", 404));
  });
  it("Should be able to create a refresh token for the request", async () => {
    const createToken = jest.spyOn(userTokensRepositoryInMemory, "create");
    const user = await usersRepositoryInMemory.create({
      name: "Richard Nguyen",
      email: "ru@gozihajo.as",
      password: "12345",
      drivers_license: "3611423834"
    });
    await sendForgotPasswordMailUseCase.execute({
      email: user.email
    });
    expect(createToken).toHaveBeenCalled();
  });
});