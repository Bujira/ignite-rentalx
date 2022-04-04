import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { ISendMailParams } from "../../typings/MailProvider/ISendMailParams";
import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail({
    to,
    subject,
    params,
    path,
  }: ISendMailParams): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(params);

    await this.client.sendMail({
      to,
      from: "Rentalx <admin@bujirarentalx.com>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
