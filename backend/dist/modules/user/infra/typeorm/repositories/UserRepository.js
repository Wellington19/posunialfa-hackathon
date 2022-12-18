"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;
var _dataSource = require("../../../../../shared/infra/typeorm/dataSource");
var _User = require("../entities/User");
class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.MyDBDataSource.getRepository(_User.User);
  }
  async create({
    name,
    username,
    password,
    profile,
    situation
  }) {
    const user = this.repository.create({
      name,
      username,
      password,
      profile,
      situation
    });
    await this.repository.save(user);
  }
  async find({
    profile,
    skip,
    limit
  }) {
    const [users, totalCount] = await this.repository.findAndCount({
      select: ['id', 'name', 'username', 'profile', 'situation', 'created_at'],
      where: {
        profile
      },
      order: {
        name: 'ASC',
        username: 'ASC',
        created_at: 'ASC'
      },
      skip: skip || 0,
      take: limit || 0
    });
    return {
      users,
      totalCount
    };
  }
  async findById(id) {
    return await this.repository.findOne({
      select: ['id', 'name', 'username', 'profile', 'situation', 'created_at'],
      where: {
        id
      }
    });
  }
  async findByUsername(username) {
    return await this.repository.findOneBy({
      username
    });
  }
  async update({
    id,
    name,
    username,
    password,
    profile,
    situation
  }) {
    let objUpdate = {};
    name ? objUpdate = {
      ...objUpdate,
      name
    } : objUpdate;
    username ? objUpdate = {
      ...objUpdate,
      username
    } : objUpdate;
    password ? objUpdate = {
      ...objUpdate,
      password
    } : objUpdate;
    profile ? objUpdate = {
      ...objUpdate,
      profile
    } : objUpdate;
    situation ? objUpdate = {
      ...objUpdate,
      situation
    } : objUpdate;
    if (!(Object.keys(objUpdate).length === 0)) {
      await this.repository.createQueryBuilder().update().set(objUpdate).where('id = :id', {
        id
      }).execute();
    }
  }
  async delete(id) {
    const user = await this.repository.findOneBy({
      id
    });
    await this.repository.remove(user);
  }
}
exports.UserRepository = UserRepository;