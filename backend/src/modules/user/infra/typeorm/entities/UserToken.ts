import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users_token')
export class UserToken {
  @PrimaryColumn({ type: 'nchar', length: 36 })
  id?: string

  @Column({ type: 'nvarchar', length: 255 })
  refresh_token: string

  @Column({ type: 'nchar', length: 36 })
  user_id: string

  @Column({ type: 'datetime' })
  expires_in: Date

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
  }
}

