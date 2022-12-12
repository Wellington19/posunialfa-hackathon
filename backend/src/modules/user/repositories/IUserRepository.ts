import { User } from '../infra/typeorm/entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IFindUserDTO } from '../dtos/IFindUserDTO'
import { IResponseFindUser } from '../dtos/IResponse'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>
  find(data: IFindUserDTO): Promise<IResponseFindUser>
  findById(id: string): Promise<User>
  findByUsername(username: string): Promise<User>
  update(data: IUpdateUserDTO): Promise<void>
  delete(id: string): Promise<void>
}
