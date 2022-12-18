"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _IUserRepository = require("../../repositories/IUserRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let PatchUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class PatchUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    id,
    name,
    username,
    password,
    profile,
    situation
  }) {
    let user = await this.userRepository.findById(id);
    if (!user) throw new _AppError.AppError('Usuário não existe na base de dados', 404);
    if (username) {
      user = await this.userRepository.findByUsername(username);
      if (user && user.id !== id) throw new _AppError.AppError(`Usuário ${username} já cadastrado para o usuário: ${user.name}`);
    }
    await this.userRepository.update({
      id,
      name,
      username,
      password: password ? await (0, _bcrypt.hash)(password, 8) : '',
      profile,
      situation
    });
  }
}) || _class) || _class) || _class) || _class);
exports.PatchUserUseCase = PatchUserUseCase;