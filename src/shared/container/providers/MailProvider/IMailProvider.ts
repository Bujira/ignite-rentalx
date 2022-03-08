import { ISendMailParams } from "../typings/MailProvider/ISendMailParams";

interface IMailProvider {
  sendMail({ to, subject, body }: ISendMailParams): Promise<void>;
}

export { IMailProvider };
