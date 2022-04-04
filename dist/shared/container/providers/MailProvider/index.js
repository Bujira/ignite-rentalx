"use strict";

var _tsyringe = require("tsyringe");

var _MailTrapMailProvider = require("./implementations/MailTrapMailProvider");

var _SESMailProvider = require("./implementations/SESMailProvider");

const mailProvider = {
  local: _tsyringe.container.resolve(_MailTrapMailProvider.MailTrapMailProvider),
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);