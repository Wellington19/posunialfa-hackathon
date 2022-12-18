"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindRatingImcUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IRatingImcRepository = require("../../repositories/IRatingImcRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let FindRatingImcUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RatingImcRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRatingImcRepository.IRatingImcRepository === "undefined" ? Object : _IRatingImcRepository.IRatingImcRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindRatingImcUseCase {
  constructor(ratingImcRepository) {
    this.ratingImcRepository = ratingImcRepository;
  }
  async execute({
    user_student_id,
    skip,
    limit
  }) {
    return await this.ratingImcRepository.find({
      user_student_id,
      skip,
      limit
    });
  }
}) || _class) || _class) || _class) || _class);
exports.FindRatingImcUseCase = FindRatingImcUseCase;