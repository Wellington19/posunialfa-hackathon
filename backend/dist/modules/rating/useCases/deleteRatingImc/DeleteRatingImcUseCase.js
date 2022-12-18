"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRatingImcUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IRatingImcRepository = require("../../repositories/IRatingImcRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let DeleteRatingImcUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RatingImcRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRatingImcRepository.IRatingImcRepository === "undefined" ? Object : _IRatingImcRepository.IRatingImcRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteRatingImcUseCase {
  constructor(ratingImcRepository) {
    this.ratingImcRepository = ratingImcRepository;
  }
  async execute(id) {
    const rating = await this.ratingImcRepository.findById(id);
    if (!rating) throw new _AppError.AppError('Avaliação não existe na base de dados', 404);
    await this.ratingImcRepository.delete(id);
  }
}) || _class) || _class) || _class) || _class);
exports.DeleteRatingImcUseCase = DeleteRatingImcUseCase;