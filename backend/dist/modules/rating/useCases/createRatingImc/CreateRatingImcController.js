"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRatingImcController = void 0;
var _tsyringe = require("tsyringe");
var _CreateRatingImcUseCase = require("./CreateRatingImcUseCase");
class CreateRatingImcController {
  async handle(request, response) {
    const {
      height,
      weight,
      user_rating_id,
      user_student_id
    } = request.body;
    const createRatingImcUseCase = _tsyringe.container.resolve(_CreateRatingImcUseCase.CreateRatingImcUseCase);
    await createRatingImcUseCase.execute({
      height,
      weight,
      user_rating_id,
      user_student_id
    });
    return response.status(201).send();
  }
}
exports.CreateRatingImcController = CreateRatingImcController;