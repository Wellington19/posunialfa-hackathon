"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokenRepository = void 0;
var _dataSource = require("../../../../../shared/infra/typeorm/dataSource");
var _UserToken = require("../entities/UserToken");
class UserTokenRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.MyDBDataSource.getRepository(_UserToken.UserToken);
  }
  async create({
    refresh_token,
    user_id,
    expires_in
  }) {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_in
    });
    await this.repository.save(userToken);
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return await this.repository.findOneBy({
      user_id,
      refresh_token
    });
  }
  async findByRefreshToken(refresh_token) {
    return await this.repository.findOneBy({
      refresh_token
    });
  }
  async delete(id) {
    await this.repository.delete(id);
  }
}
exports.UserTokenRepository = UserTokenRepository;