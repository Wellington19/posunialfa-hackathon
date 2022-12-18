"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRatingImcUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IRatingImcRepository = require("../../repositories/IRatingImcRepository");
var _IUserRepository = require("../../../user/repositories/IUserRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let CreateRatingImcUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RatingImcRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IRatingImcRepository.IRatingImcRepository === "undefined" ? Object : _IRatingImcRepository.IRatingImcRepository, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateRatingImcUseCase {
  constructor(ratingImcRepository, userRepository) {
    this.ratingImcRepository = ratingImcRepository;
    this.userRepository = userRepository;
  }
  async execute({
    height,
    weight,
    user_rating_id,
    user_student_id
  }) {
    let user = await this.userRepository.findById(user_student_id);
    if (!user) throw new _AppError.AppError('Aluno não existe na base de dados', 404);
    if (user.profile !== 'Aluno') throw new _AppError.AppError('Usuário informado não tem perfil de aluno', 400);
    if (user.situation !== 'A') throw new _AppError.AppError('Não é permitido cadastrar avaliação para aluno inativo', 400);
    user = await this.userRepository.findById(user_rating_id);
    if (!user) throw new _AppError.AppError('Usuário avaliador não existe na base de dados', 404);
    if (user.situation !== 'A') throw new _AppError.AppError('Não é permitido cadastrar avaliação com um avaliador inativo', 400);
    let classification = 'BAIXO PESO';
    let degree = '0';
    const imc = Number((weight / (height * height)).toFixed(2));
    if (imc > 18.5 && imc <= 24.99) classification = 'NORMAL';else if (imc >= 25 && imc <= 29.99) classification = 'SOBREPESO';else if (imc >= 30) {
      classification = 'OBESIDADE';
      if (imc <= 34.99) degree = 'I';else if (imc <= 39.99) degree = 'II';else if (imc > 40) degree = 'III';
    }
    await this.ratingImcRepository.create({
      height,
      weight,
      imc,
      classification,
      degree,
      user_rating_id,
      user_student_id
    });
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.CreateRatingImcUseCase = CreateRatingImcUseCase;