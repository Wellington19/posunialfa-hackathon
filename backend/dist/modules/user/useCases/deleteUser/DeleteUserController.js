"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteUserUseCase = require("./DeleteUserUseCase");
class DeleteUserController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const deleteUserUseCase = _tsyringe.container.resolve(_DeleteUserUseCase.DeleteUserUseCase);
    await deleteUserUseCase.execute(id);
    return response.status(204).send();
  }
}
exports.DeleteUserController = DeleteUserController;