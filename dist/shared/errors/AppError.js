"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

class AppError {
  constructor(messsage, statusCode = 400) {
    this.message = void 0;
    this.statusCode = void 0;
    this.message = messsage;
    this.statusCode = statusCode;
  }

}

exports.AppError = AppError;