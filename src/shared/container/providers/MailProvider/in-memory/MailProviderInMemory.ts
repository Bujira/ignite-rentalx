/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISendMailParams } from "../../typings/MailProvider/ISendMailParams";
import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  message: any[] = [];

  async sendMail({
    to,
    subject,
    params,
    path,
  }: ISendMailParams): Promise<void> {
    this.message.push({
      to,
      subject,
      params,
      path,
    });
  }
}

export { MailProviderInMemory };
