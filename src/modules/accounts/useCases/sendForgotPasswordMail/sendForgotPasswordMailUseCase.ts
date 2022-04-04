/* eslint-disable prettier/prettier */
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { ISendForgotPasswordMailDTO } from "@modules/accounts/typings/ISendForgotPasswordMailDTO";
import { resolve } from "path"
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";


import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) { }
  async execute({ email }: ISendForgotPasswordMailDTO): Promise<void> {
    const user = await this.usersRepository.getByEmail({ email });
    const emailLinkExpirationHours = 3;

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exist!", 404);
    }

    const token = uuid();

    const expiration_date = this.dateProvider.addHours(emailLinkExpirationHours);

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expiration_date
    });

    const params = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}=${token}`
    }

    await this.mailProvider.sendMail({
      to: email,
      subject: "Reset Password",
      params,
      path: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };
