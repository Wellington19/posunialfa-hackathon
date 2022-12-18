"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopulateUsers1671367398456 = void 0;
var _bcrypt = require("bcrypt");
var _uuid = require("uuid");
class PopulateUsers1671367398456 {
  async up(queryRunner) {
    const password = await (0, _bcrypt.hash)('unialfa', 8);
    await queryRunner.query(`
      INSERT INTO users (id, name, username, password, profile, situation) 
      VALUES ('${(0, _uuid.v4)()}', 'Wellington da Silva Ferreira', 'admin', '${password}', 'Administrador', 'A')
    `);
    for (let index = 1; index <= 10; index++) {
      await queryRunner.query(`
        INSERT INTO users (id, name, username, password, profile, situation) 
        VALUES ('${(0, _uuid.v4)()}', 'Professor ${index}', 'professor${index}', '${password}', 'Professor', 'A')
      `);
      await queryRunner.query(`        
        INSERT INTO users (id, name, username, password, profile, situation) 
        VALUES ('${(0, _uuid.v4)()}', 'Aluno ${index}', 'aluno${index}', '${password}', 'Aluno', 'A')
      `);
    }
  }
  async down(queryRunner) {
    await queryRunner.query(`
      DELETE FROM users
    `);
  }
}
exports.PopulateUsers1671367398456 = PopulateUsers1671367398456;