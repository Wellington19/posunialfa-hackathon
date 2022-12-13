import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import auth from '@config/auth'
import { generateTokens } from '@utils/generateTokens'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IResponseTokens } from '@modules/session/dtos/IResponse'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  username: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute({ username, password }: IExecute): Promise<IResponseTokens> {
    const user = await this.userRepository.findByUsername(username)
    if (!user || user.situation === 'I') throw new AppError('Usuário ou senha incorreto(s)!')

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new AppError('Usuário ou senha incorreto(s)!')

    const token = generateTokens({ sub: user.id, username })
    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token: token.refresh_token,
      expires_in: this.dateProvider.addHours(auth.expiresInRefreshTokenHours)
    })

    return token
  }
}
