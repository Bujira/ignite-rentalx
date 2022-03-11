import { ISendMailParams } from "../typings/MailProvider/ISendMailParams";

interface IMailProvider {
  sendMail({ to, subject, params, path }: ISendMailParams): Promise<void>;
}

export { IMailProvider };
