import { MigrationInterface, QueryRunner } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export class PopulateUsers1671367398456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('unialfa', 8)

    await queryRunner.query(`
      INSERT INTO users (id, name, username, password, profile, situation) 
      VALUES ('${uuidV4()}', 'Wellington da Silva Ferreira', 'admin', '${password}', 'Administrador', 'A')
    `)

    for (let index = 1; index <= 10; index++) {
      await queryRunner.query(`
        INSERT INTO users (id, name, username, password, profile, situation) 
        VALUES ('${uuidV4()}', 'Professor ${index}', 'professor${index}', '${password}', 'Professor', 'A')
      `)

      await queryRunner.query(`        
        INSERT INTO users (id, name, username, password, profile, situation) 
        VALUES ('${uuidV4()}', 'Aluno ${index}', 'aluno${index}', '${password}', 'Aluno', 'A')
      `)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users
    `)
  }
}
