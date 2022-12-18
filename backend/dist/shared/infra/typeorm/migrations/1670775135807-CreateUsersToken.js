"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersToken1670775135807 = void 0;
var _typeorm = require("typeorm");
class CreateUsersToken1670775135807 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_token',
      columns: [{
        name: 'id',
        type: 'nchar(36)',
        isPrimary: true
      }, {
        name: 'refresh_token',
        type: 'nvarchar(255)'
      }, {
        name: 'user_id',
        type: 'nchar(36)'
      }, {
        name: 'expires_in',
        type: 'datetime'
      }, {
        name: 'created_at',
        type: 'datetime',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('users_token', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('users_token');
  }
}
exports.CreateUsersToken1670775135807 = CreateUsersToken1670775135807;