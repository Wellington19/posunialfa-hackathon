"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserController = void 0;
var _tsyringe = require("tsyringe");
var _FindUserUseCase = require("./FindUserUseCase");
class FindUserController {
  async handle(request, response) {
    const {
      profile,
      skip,
      limit
    } = request.query;
    const findUserUseCase = _tsyringe.container.resolve(_FindUserUseCase.FindUserUseCase);
    const {
      users,
      totalCount
    } = await findUserUseCase.execute({
      profile: profile?.toString(),
      skip: parseInt(skip?.toString()),
      limit: parseInt(limit?.toString())
    });
    return response.set('x-total-count', totalCount.toString()).json(users);
  }
}
exports.FindUserController = FindUserController;