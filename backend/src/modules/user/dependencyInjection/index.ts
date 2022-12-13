import { container } from 'tsyringe'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository'
container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository'
import { UserTokenRepository } from '@modules/user/infra/typeorm/repositories/UserTokenRepository'
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)