import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { PatchRatingImcUseCase } from './PatchRatingImcUseCase'

export class PatchRatingImcController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { height, weight, user_rating_id, user_student_id } = request.body

    const patchRatingImcUseCase = container.resolve(PatchRatingImcUseCase)

    await patchRatingImcUseCase.execute({
      id,
      height,
      weight,
      user_rating_id,
      user_student_id
    })

    return response.status(204).send()
  }
}