"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTokens = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _auth = _interopRequireDefault(require("../config/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateTokens = payload => {
  const accessToken = _jsonwebtoken.default.sign({}, _auth.default.secretToken, {
    subject: payload.sub,
    // userId
    expiresIn: _auth.default.expiresInToken
  });
  const refreshToken = _jsonwebtoken.default.sign({
    username: payload.username
  }, _auth.default.secretRefreshToken, {
    subject: payload.sub,
    // userId
    expiresIn: _auth.default.expiresInRefreshToken
  });
  return {
    access_token: accessToken,
    refresh_token: refreshToken
  };
};
exports.generateTokens = generateTokens;