import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'nchar', length: 36 })
  id?: string

  @Column({ type: 'nvarchar', length: 60 })
  name: string

  @Column({ type: 'nvarchar', length: 60, unique: true })
  username: string

  @Column({ type: 'nvarchar', length: 255 })
  password: string

  @Column({ type: 'nvarchar', length: 20 })
  profile: string

  @Column({ type: 'nchar', length: 1 })
  situation: string

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
  }
}
