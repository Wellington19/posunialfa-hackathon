import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindRatingImcUseCase } from './FindRatingImcUseCase'

export class FindRatingImcController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_student_id, skip, limit } = request.query

    const findRatingImcUseCase = container.resolve(FindRatingImcUseCase)

    const { ratings, totalCount } = await findRatingImcUseCase.execute({
      user_student_id: user_student_id?.toString(),
      skip: parseInt(skip.toString()),
      limit: parseInt(limit.toString())
    })

    return response.set('x-total-count', totalCount.toString()).json(ratings)
  }
}
