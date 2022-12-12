import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRatingImc1670775524833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rating_imc',
        columns: [
          {
            name: 'id',
            type: 'nchar(36)',
            isPrimary: true
          },
          {
            name: 'height',
            type: 'numeric(19,6)'
          },
          {
            name: 'weight',
            type: 'numeric(19,6)'
          },
          {
            name: 'imc',
            type: 'numeric(19,6)'
          },
          {
            name: 'classification',
            type: 'nvarchar(30)'
          },
          {
            name: 'degree',
            type: 'nvarchar(10)'
          },
          {
            name: 'user_inclusion_id',
            type: 'nchar(36)'
          },
          {
            name: 'user_student_id',
            type: 'nchar(36)'
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'rating_imc',
      new TableForeignKey({
        columnNames: ['user_inclusion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'rating_imc',
      new TableForeignKey({
        columnNames: ['user_student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rating_imc')
  }
}
