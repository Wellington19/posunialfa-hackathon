"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshToken = exports.authenticateUser = void 0;
var _celebrate = require("celebrate");
const authenticateUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    username: _celebrate.Joi.string().required().max(60),
    password: _celebrate.Joi.string().required().max(255)
  }
});
exports.authenticateUser = authenticateUser;
const refreshToken = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    refresh_token: _celebrate.Joi.string().required().max(255)
  }
});
exports.refreshToken = refreshToken;