import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import auth from '@config/auth'

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository'
import { IPayload } from '@modules/session/dtos/IPayload'
import { AppError } from '@shared/errors/AppError'

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers
  if (!authorization) throw new AppError('Token não encontrado', 401)

  const [, token] = authorization.split(' ')

  try {
    const { sub: userId } = jwt.verify(token, auth.secretToken) as IPayload

    const userRepository = new UserRepository()
    const user = await userRepository.findById(userId)
    if (!user) throw new AppError('Usuário não existe na base de dados', 401)

    request.user = {
      id: userId
    }

    next()
  } catch (error) {
    throw new AppError('Token inválido', 401)
  }
}
