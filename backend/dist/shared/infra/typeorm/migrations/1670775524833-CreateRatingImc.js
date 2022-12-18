"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRatingImc1670775524833 = void 0;
var _typeorm = require("typeorm");
class CreateRatingImc1670775524833 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'rating_imc',
      columns: [{
        name: 'id',
        type: 'nchar(36)',
        isPrimary: true
      }, {
        name: 'height',
        type: 'numeric(19,6)'
      }, {
        name: 'weight',
        type: 'numeric(19,6)'
      }, {
        name: 'imc',
        type: 'numeric(19,6)'
      }, {
        name: 'classification',
        type: 'nvarchar(30)'
      }, {
        name: 'degree',
        type: 'nvarchar(10)'
      }, {
        name: 'user_rating_id',
        type: 'nchar(36)'
      }, {
        name: 'user_student_id',
        type: 'nchar(36)'
      }, {
        name: 'created_at',
        type: 'datetime',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('rating_imc', new _typeorm.TableForeignKey({
      columnNames: ['user_rating_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('rating_imc', new _typeorm.TableForeignKey({
      columnNames: ['user_student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('rating_imc');
  }
}
exports.CreateRatingImc1670775524833 = CreateRatingImc1670775524833;