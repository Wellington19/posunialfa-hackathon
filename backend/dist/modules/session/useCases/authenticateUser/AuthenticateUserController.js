"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;
var _tsyringe = require("tsyringe");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
class AuthenticateUserController {
  async handle(request, response) {
    const {
      username,
      password
    } = request.body;
    const authenticateUserUseCase = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);
    const token = await authenticateUserUseCase.execute({
      username,
      password
    });
    return response.json(token);
  }
}
exports.AuthenticateUserController = AuthenticateUserController;