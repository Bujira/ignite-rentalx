import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { MailTrapMailProvider } from "./implementations/MailTrapMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  local: container.resolve(MailTrapMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);
