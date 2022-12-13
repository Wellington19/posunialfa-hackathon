import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteRatingImcUseCase } from './DeleteRatingImcUseCase'

export class DeleteRatingImcController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteRatingImcUseCase = container.resolve(DeleteRatingImcUseCase)

    await deleteRatingImcUseCase.execute(id)

    return response.status(204).send()
  }
}