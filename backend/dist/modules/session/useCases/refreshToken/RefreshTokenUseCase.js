"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;
var _tsyringe = require("tsyringe");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _generateTokens = require("../../../../utils/generateTokens");
var _IUserTokenRepository = require("../../../user/repositories/IUserTokenRepository");
var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserTokenRepository.IUserTokenRepository === "undefined" ? Object : _IUserTokenRepository.IUserTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(userTokenRepository, dateProvider) {
    this.userTokenRepository = userTokenRepository;
    this.dateProvider = dateProvider;
  }
  async execute({
    refresh_token
  }) {
    const {
      sub: userId,
      username
    } = _jsonwebtoken.default.verify(refresh_token, _auth.default.secretRefreshToken);
    const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(userId, refresh_token);
    if (!userToken) throw new _AppError.AppError('Refresh token inválido');
    await this.userTokenRepository.delete(userToken.id);
    const token = (0, _generateTokens.generateTokens)({
      sub: userId,
      username
    });
    await this.userTokenRepository.create({
      user_id: userId,
      refresh_token: token.refresh_token,
      expires_in: this.dateProvider.addHours(_auth.default.expiresInRefreshTokenHours)
    });
    return token;
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;