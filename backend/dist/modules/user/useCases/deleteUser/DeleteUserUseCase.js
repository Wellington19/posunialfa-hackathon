"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../../repositories/IUserRepository");
var _IRatingImcRepository = require("../../../rating/repositories/IRatingImcRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let DeleteUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RatingImcRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IRatingImcRepository.IRatingImcRepository === "undefined" ? Object : _IRatingImcRepository.IRatingImcRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteUserUseCase {
  constructor(userRepository, ratingImcRepository) {
    this.userRepository = userRepository;
    this.ratingImcRepository = ratingImcRepository;
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new _AppError.AppError('Usuário não existe na base de dados', 404);
    const hasStudentHistoric = await this.ratingImcRepository.find({
      user_student_id: user.id,
      skip: 0,
      limit: 1
    });
    const hasRatingHistoric = await this.ratingImcRepository.find({
      user_rating_id: user.id,
      skip: 0,
      limit: 1
    });
    if (hasStudentHistoric.totalCount > 0 || hasRatingHistoric.totalCount > 0) throw new _AppError.AppError('Não é possível excluir o usuário, ele possui histórico de avaliações');
    await this.userRepository.delete(id);
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteUserUseCase = DeleteUserUseCase;