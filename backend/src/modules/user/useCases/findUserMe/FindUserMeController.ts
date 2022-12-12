import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindUserMeUseCase } from './FindUserMeUseCase'

export class FindUserMeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const findUserMeUseCase = container.resolve(FindUserMeUseCase)

    const userMe = await findUserMeUseCase.execute({ user_requisition_id: id })

    return response.json(userMe)
  }
}
