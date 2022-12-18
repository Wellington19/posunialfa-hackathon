"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  secretToken: process.env.SECRET_TOKEN,
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
  expiresInToken: '1h',
  expiresInRefreshToken: '8h',
  expiresInRefreshTokenHours: 8
};
exports.default = _default;