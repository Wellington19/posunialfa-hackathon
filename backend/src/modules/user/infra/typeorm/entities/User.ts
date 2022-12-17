import { RatingImc } from '@modules/rating/infra/typeorm/entities/RatingImc'
import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
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

  @ManyToOne(() => RatingImc, ratingImc => ratingImc.user_rating)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_rating_id' })
  user_rating: RatingImc

  @ManyToOne(() => RatingImc, ratingImc => ratingImc.user_student)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_student_id' })
  user_student: RatingImc

  constructor() {
    if (!this.id) this.id = uuidV4()
  }
}
