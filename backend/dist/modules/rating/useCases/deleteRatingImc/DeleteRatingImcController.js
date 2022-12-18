"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRatingImcController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteRatingImcUseCase = require("./DeleteRatingImcUseCase");
class DeleteRatingImcController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const deleteRatingImcUseCase = _tsyringe.container.resolve(_DeleteRatingImcUseCase.DeleteRatingImcUseCase);
    await deleteRatingImcUseCase.execute(id);
    return response.status(204).send();
  }
}
exports.DeleteRatingImcController = DeleteRatingImcController;