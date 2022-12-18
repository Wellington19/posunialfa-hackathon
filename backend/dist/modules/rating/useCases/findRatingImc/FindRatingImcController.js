"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindRatingImcController = void 0;
var _tsyringe = require("tsyringe");
var _FindRatingImcUseCase = require("./FindRatingImcUseCase");
class FindRatingImcController {
  async handle(request, response) {
    const {
      user_student_id,
      skip,
      limit
    } = request.query;
    const findRatingImcUseCase = _tsyringe.container.resolve(_FindRatingImcUseCase.FindRatingImcUseCase);
    const {
      ratings,
      totalCount
    } = await findRatingImcUseCase.execute({
      user_student_id: user_student_id?.toString(),
      skip: parseInt(skip.toString()),
      limit: parseInt(limit.toString())
    });
    return response.set('x-total-count', totalCount.toString()).json(ratings);
  }
}
exports.FindRatingImcController = FindRatingImcController;