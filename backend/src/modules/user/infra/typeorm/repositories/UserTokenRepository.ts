import { Repository } from 'typeorm'
import { MyDBDataSource } from '@shared/infra/typeorm/dataSource'

import { UserToken } from '@modules/user/infra/typeorm/entities/UserToken'
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository'
import { ICreateUserTokenDTO } from '@modules/user/dtos/ICreateUserTokenDTO'

export class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = MyDBDataSource.getRepository(UserToken)
  }

  async create({ refresh_token, user_id, expires_in }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({ refresh_token, user_id, expires_in })
    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    return await this.repository.findOneBy({ user_id, refresh_token })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return await this.repository.findOneBy({ refresh_token })
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
