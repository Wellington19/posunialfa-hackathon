"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1670775129732 = void 0;
var _typeorm = require("typeorm");
class CreateUsers1670775129732 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'nchar(36)',
        isPrimary: true
      }, {
        name: 'name',
        type: 'nvarchar(60)'
      }, {
        name: 'username',
        type: 'nvarchar(60)',
        isUnique: true
      }, {
        name: 'password',
        type: 'nvarchar(255)'
      }, {
        name: 'profile',
        type: 'nvarchar(20)'
      }, {
        name: 'situation',
        type: 'nchar(1)'
      }, {
        name: 'created_at',
        type: 'datetime',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}
exports.CreateUsers1670775129732 = CreateUsers1670775129732;