import jwt from 'jsonwebtoken'
import auth from '@config/auth'

import { IPayload } from '@modules/session/dtos/IPayload'
import { IResponseTokens } from '@modules/session/dtos/IResponse'

export const generateTokens = (payload: IPayload): IResponseTokens => {
  const accessToken = jwt.sign({}, auth.secretToken, {
    subject: payload.sub, // userId
    expiresIn: auth.expiresInToken
  })

  const refreshToken = jwt.sign({ username: payload.username }, auth.secretRefreshToken, {
    subject: payload.sub, // userId
    expiresIn: auth.expiresInRefreshToken
  })

  return { access_token: accessToken, refresh_token: refreshToken }
}
