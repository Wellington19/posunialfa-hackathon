"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;
class AppError {
  constructor(message, statusCode = 400) {
    this.message = void 0;
    this.status_code = void 0;
    this.message = message;
    this.status_code = statusCode;
  }
}
exports.AppError = AppError;