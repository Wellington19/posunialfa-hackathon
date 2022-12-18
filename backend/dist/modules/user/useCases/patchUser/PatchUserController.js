"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatchUserController = void 0;
var _tsyringe = require("tsyringe");
var _PatchUserUseCase = require("./PatchUserUseCase");
class PatchUserController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      username,
      password,
      profile,
      situation
    } = request.body;
    const patchUserUseCase = _tsyringe.container.resolve(_PatchUserUseCase.PatchUserUseCase);
    await patchUserUseCase.execute({
      id,
      name,
      username,
      password,
      profile,
      situation
    });
    return response.status(204).send();
  }
}
exports.PatchUserController = PatchUserController;