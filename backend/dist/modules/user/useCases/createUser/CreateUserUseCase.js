"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _bcrypt = require("bcrypt");
var _IUserRepository = require("../../repositories/IUserRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    name,
    username,
    password,
    profile,
    situation
  }) {
    const user = await this.userRepository.findByUsername(username);
    if (user) throw new _AppError.AppError(`Usuário ${username} já cadastrado para o usuário: ${user.name}`);
    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    await this.userRepository.create({
      name,
      username,
      password: passwordHash,
      profile,
      situation
    });
  }
}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;