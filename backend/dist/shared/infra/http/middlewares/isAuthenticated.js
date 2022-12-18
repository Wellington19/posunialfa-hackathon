"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _UserRepository = require("../../../../modules/user/infra/typeorm/repositories/UserRepository");
var _AppError = require("../../../errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function ensureAuthenticated(request, response, next) {
  const {
    authorization
  } = request.headers;
  if (!authorization) throw new _AppError.AppError('Token não encontrado', 401);
  const [, token] = authorization.split(' ');
  try {
    const {
      sub: userId
    } = _jsonwebtoken.default.verify(token, _auth.default.secretToken);
    const userRepository = new _UserRepository.UserRepository();
    const user = await userRepository.findById(userId);
    if (!user) throw new _AppError.AppError('Usuário não existe na base de dados', 401);
    request.user = {
      id: userId
    };
    next();
  } catch (error) {
    throw new _AppError.AppError('Token inválido', 401);
  }
}