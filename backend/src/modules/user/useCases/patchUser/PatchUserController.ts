import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { PatchUserUseCase } from './PatchUserUseCase'

export class PatchUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {
      name,
      username,
      password,
      profile,
      situation
    } = request.body

    const patchUserUseCase = container.resolve(PatchUserUseCase)

    await patchUserUseCase.execute({
      id,
      name,
      username,
      password,
      profile,
      situation
    })

    return response.status(204).send()
  }
}