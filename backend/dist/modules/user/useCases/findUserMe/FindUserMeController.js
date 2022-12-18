"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserMeController = void 0;
var _tsyringe = require("tsyringe");
var _FindUserMeUseCase = require("./FindUserMeUseCase");
class FindUserMeController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const findUserMeUseCase = _tsyringe.container.resolve(_FindUserMeUseCase.FindUserMeUseCase);
    const userMe = await findUserMeUseCase.execute({
      user_requisition_id: id
    });
    return response.json(userMe);
  }
}
exports.FindUserMeController = FindUserMeController;