import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('rating_imc')
export class RatingImc {
  @PrimaryColumn({ type: 'nchar', length: 36 })
  id?: string

  @Column({ type: 'numeric', precision: 19, scale: 6 })
  height: number

  @Column({ type: 'numeric', precision: 19, scale: 6 })
  weight: number

  @Column({ type: 'numeric', precision: 19, scale: 6 })
  imc: number

  @Column({ type: 'nvarchar', length: 30 })
  classification: string

  @Column({ type: 'nvarchar', length: 10 })
  degree: string

  @Column({ type: 'nchar', length: 36 })
  user_inclusion_id: string

  @Column({ type: 'nchar', length: 36 })
  user_student_id: string

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
  }
}

