import { UserToken } from '../infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'

export interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<void>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
  delete(id: string): Promise<void>
}
