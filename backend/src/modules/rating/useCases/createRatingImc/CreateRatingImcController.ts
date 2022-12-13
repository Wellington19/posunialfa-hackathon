import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRatingImcUseCase } from './CreateRatingImcUseCase'

export class CreateRatingImcController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { height, weight, user_rating_id, user_student_id } = request.body

    const createRatingImcUseCase = container.resolve(CreateRatingImcUseCase)

    await createRatingImcUseCase.execute({
      height,
      weight,
      user_rating_id,
      user_student_id
    })

    return response.status(201).send()
  }
}