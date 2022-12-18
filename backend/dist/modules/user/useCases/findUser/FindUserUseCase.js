"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../../repositories/IUserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let FindUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    profile,
    skip,
    limit
  }) {
    return await this.userRepository.find({
      profile,
      skip,
      limit
    });
  }
}) || _class) || _class) || _class) || _class);
exports.FindUserUseCase = FindUserUseCase;