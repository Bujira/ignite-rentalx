"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

/* eslint-disable @typescript-eslint/no-explicit-any */
class MailProviderInMemory {
  constructor() {
    this.message = [];
  }

  async sendMail({
    to,
    subject,
    params,
    path
  }) {
    this.message.push({
      to,
      subject,
      params,
      path
    });
  }

}

exports.MailProviderInMemory = MailProviderInMemory;