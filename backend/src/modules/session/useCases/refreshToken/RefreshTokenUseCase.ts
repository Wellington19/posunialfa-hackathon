import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import auth from '@config/auth'
import { generateTokens } from '@utils/generateTokens'

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IResponseTokens } from '@modules/session/dtos/IResponse'
import { IPayload } from '@modules/session/dtos/IPayload'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  refresh_token: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute({ refresh_token }: IExecute): Promise<IResponseTokens> {
    const { sub: userId, username } = jwt.verify(refresh_token, auth.secretRefreshToken) as IPayload

    const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(userId, refresh_token)
    if (!userToken) throw new AppError('Refresh token inválido')

    await this.userTokenRepository.delete(userToken.id)

    const token = generateTokens({ sub: userId, username })
    await this.userTokenRepository.create({
      user_id: userId,
      refresh_token: token.refresh_token,
      expires_in: this.dateProvider.addHours(auth.expiresInRefreshTokenHours)
    })

    return token
  }
}
