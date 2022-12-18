"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchRatingImcController = void 0;
var _tsyringe = require("tsyringe");
var _PatchRatingImcUseCase = require("./PatchRatingImcUseCase");
class PatchRatingImcController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      height,
      weight,
      user_rating_id,
      user_student_id
    } = request.body;
    const patchRatingImcUseCase = _tsyringe.container.resolve(_PatchRatingImcUseCase.PatchRatingImcUseCase);
    await patchRatingImcUseCase.execute({
      id,
      height,
      weight,
      user_rating_id,
      user_student_id
    });
    return response.status(204).send();
  }
}
exports.PatchRatingImcController = PatchRatingImcController;