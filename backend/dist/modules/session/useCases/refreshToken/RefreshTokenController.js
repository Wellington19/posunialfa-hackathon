"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;
var _tsyringe = require("tsyringe");
var _RefreshTokenUseCase = require("./RefreshTokenUseCase");
class RefreshTokenController {
  async handle(request, response) {
    const {
      refresh_token
    } = request.body;
    const refreshTokenUseCase = _tsyringe.container.resolve(_RefreshTokenUseCase.RefreshTokenUseCase);
    const refreshToken = await refreshTokenUseCase.execute({
      refresh_token
    });
    return response.json(refreshToken);
  }
}
exports.RefreshTokenController = RefreshTokenController;