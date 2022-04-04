"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailTrapMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let MailTrapMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class MailTrapMailProvider {
  constructor() {
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(() => {
      const transporter = _nodemailer.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "edbe7d86a44646",
          pass: "44f605c5b4bed2"
        }
      });

      this.client = transporter;
    }).catch(err => console.log(err));
  }

  async sendMail({
    to,
    subject,
    params,
    path
  }) {
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(params);
    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreply@rentalx.com.br>",
      subject,
      html: templateHTML
    });
    console.log("Message sent: %s", message.messageId); // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }

}) || _class) || _class) || _class);
exports.MailTrapMailProvider = MailTrapMailProvider;