"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _generateTokens = require("../../../../utils/generateTokens");
var _IUserRepository = require("../../../user/repositories/IUserRepository");
var _IUserTokenRepository = require("../../../user/repositories/IUserTokenRepository");
var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokenRepository.IUserTokenRepository === "undefined" ? Object : _IUserTokenRepository.IUserTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, userTokenRepository, dateProvider) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.dateProvider = dateProvider;
  }
  async execute({
    username,
    password
  }) {
    const user = await this.userRepository.findByUsername(username);
    if (!user || user.situation === 'I') throw new _AppError.AppError('Usuário ou senha incorreto(s)!');
    const passwordMatch = await (0, _bcrypt.compare)(password, user.password);
    if (!passwordMatch) throw new _AppError.AppError('Usuário ou senha incorreto(s)!');
    const token = (0, _generateTokens.generateTokens)({
      sub: user.id,
      username
    });
    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token: token.refresh_token,
      expires_in: this.dateProvider.addHours(_auth.default.expiresInRefreshTokenHours)
    });
    return token;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;