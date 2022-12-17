import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindUserUseCase } from './FindUserUseCase'

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { profile, skip, limit } = request.query

    const findUserUseCase = container.resolve(FindUserUseCase)

    const { users, totalCount } = await findUserUseCase.execute({
      profile: profile?.toString(),
      skip: parseInt(skip?.toString()),
      limit: parseInt(limit?.toString())
    })

    return response.set('x-total-count', totalCount.toString()).json(users)
  }
}
