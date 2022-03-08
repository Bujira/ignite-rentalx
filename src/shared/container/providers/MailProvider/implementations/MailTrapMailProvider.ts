import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { ISendMailParams } from "../../typings/MailProvider/ISendMailParams";
import { IMailProvider } from "../IMailProvider";

@injectable()
class MailTrapMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "edbe7d86a44646",
            pass: "44f605c5b4bed2",
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }
  async sendMail({ to, subject, body }: ISendMailParams): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreply@rentalx.com.br>",
      subject,
      text: body,
      html: body,
      attachments: [
        {
          filename: "mailtest.jpeg",
          path: `${__dirname}/mailtest.jpeg`,
          cid: "uniq-mailtest.jpeg",
        },
      ],
    });

    console.log("Message sent: %s", message.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { MailTrapMailProvider };
