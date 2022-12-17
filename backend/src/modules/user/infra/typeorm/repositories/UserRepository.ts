import { Repository } from 'typeorm'
import { MyDBDataSource } from '@shared/infra/typeorm/dataSource'

import { User } from '@modules/user/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'
import { IFindUserDTO } from '@modules/user/dtos/IFindUserDTO'
import { IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO'
import { IResponseFindUser } from '@modules/user/dtos/IResponse'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = MyDBDataSource.getRepository(User)
  }

  async create({ name, username, password, profile, situation }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      profile,
      situation
    })

    await this.repository.save(user)
  }

  async find({ profile, skip, limit }: IFindUserDTO): Promise<IResponseFindUser> {
    const [users, totalCount] = await this.repository.findAndCount({
      select: ['id', 'name', 'username', 'profile', 'situation', 'created_at'],
      where: { profile },
      order: { name: 'ASC', username: 'ASC', created_at: 'ASC' },
      skip: skip || 0,
      take: limit || 0
    })

    return { users, totalCount }
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({
      select: ['id', 'name', 'username', 'profile', 'situation', 'created_at'],
      where: { id }
    })
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOneBy({ username })
  }

  async update({
    id,
    name,
    username,
    password,
    profile,
    situation
  }: IUpdateUserDTO): Promise<void> {
    let objUpdate = {}
    name ? objUpdate = { ...objUpdate, name } : objUpdate
    username ? objUpdate = { ...objUpdate, username } : objUpdate
    password ? objUpdate = { ...objUpdate, password } : objUpdate
    profile ? objUpdate = { ...objUpdate, profile } : objUpdate
    situation ? objUpdate = { ...objUpdate, situation } : objUpdate

    if (!(Object.keys(objUpdate).length === 0)) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set(objUpdate)
        .where('id = :id', { id })
        .execute()
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findOneBy({ id })

    await this.repository.remove(user)
  }
}
