import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1670775129732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'nchar(36)',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'nvarchar(60)',
          },
          {
            name: 'username',
            type: 'nvarchar(60)',
            isUnique: true
          },
          {
            name: 'password',
            type: 'nvarchar(255)'
          },
          {
            name: 'profile',
            type: 'nvarchar(20)',
          },
          {
            name: 'situation',
            type: 'nchar(1)',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
