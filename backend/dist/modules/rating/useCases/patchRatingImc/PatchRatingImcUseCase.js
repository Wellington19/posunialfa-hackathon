"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchRatingImcUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IRatingImcRepository = require("../../repositories/IRatingImcRepository");
var _IUserRepository = require("../../../user/repositories/IUserRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let PatchRatingImcUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RatingImcRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IRatingImcRepository.IRatingImcRepository === "undefined" ? Object : _IRatingImcRepository.IRatingImcRepository, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class PatchRatingImcUseCase {
  constructor(ratingImcRepository, userRepository) {
    this.ratingImcRepository = ratingImcRepository;
    this.userRepository = userRepository;
    this.height = void 0;
    this.weight = void 0;
    this.imc = void 0;
    this.classification = void 0;
    this.degree = void 0;
  }
  async execute({
    id,
    height,
    weight,
    user_rating_id,
    user_student_id
  }) {
    const rating = await this.ratingImcRepository.findById(id);
    if (!rating) throw new _AppError.AppError('Avaliação não existe na base de dados', 404);
    let user = await this.userRepository.findById(user_student_id);
    if (!user) throw new _AppError.AppError('Aluno não existe na base de dados', 404);
    if (user.profile !== 'Aluno') throw new _AppError.AppError('Usuário informado não tem perfil de aluno', 400);
    if (user.situation !== 'A') throw new _AppError.AppError('Não é permitido cadastrar avaliação para aluno inativo', 400);
    user = await this.userRepository.findById(user_rating_id);
    if (!user) throw new _AppError.AppError('Usuário avaliador não existe na base de dados', 404);
    if (user.situation !== 'A') throw new _AppError.AppError('Não é permitido cadastrar avaliação com um avaliador inativo', 400);
    if (height || weight) {
      this.height = Number(height ?? rating.height);
      this.weight = Number(weight ?? rating.weight);
      this.classification = rating.classification;
      this.degree = rating.degree;
      this.imc = Number((this.weight / (this.height * this.height)).toFixed(2));
      if (this.imc > 18.5 && this.imc <= 24.99) this.classification = 'NORMAL';else if (this.imc >= 25 && this.imc <= 29.99) this.classification = 'SOBREPESO';else if (this.imc >= 30) {
        this.classification = 'OBESIDADE';
        if (this.imc <= 34.99) this.degree = 'I';else if (this.imc <= 39.99) this.degree = 'II';else if (this.imc > 40) this.degree = 'III';
      }
    }
    await this.ratingImcRepository.update({
      id,
      height: this.height,
      weight: this.weight,
      imc: this.imc,
      classification: this.classification,
      degree: this.degree,
      user_rating_id,
      user_student_id
    });
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.PatchRatingImcUseCase = PatchRatingImcUseCase;