import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUsersToken1670775135807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_token',
        columns: [
          {
            name: 'id',
            type: 'nchar(36)',
            isPrimary: true
          },
          {
            name: 'refresh_token',
            type: 'nvarchar(255)'
          },
          {
            name: 'user_id',
            type: 'nchar(36)'
          },
          {
            name: 'expires_in',
            type: 'datetime',
          },
          {
            name: 'created_at',
            type: 'datetime'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'users_token',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_token')
  }
}
