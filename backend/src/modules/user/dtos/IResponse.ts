import { User } from '../infra/typeorm/entities/User'

export interface IResponseFindUser {
  users: User[]
  totalCount: number
}