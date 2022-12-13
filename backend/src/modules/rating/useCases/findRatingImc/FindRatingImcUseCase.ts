import { inject, injectable } from 'tsyringe'

import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { IResponseFindRatingImc } from '@modules/rating/dtos/IResponse'

interface IExecute {
  user_student_id?: string
  skip: number
  limit: number
}

@injectable()
export class FindRatingImcUseCase {
  constructor(
    @inject('RatingImcRepository')
    private ratingImcRepository: IRatingImcRepository
  ) { }

  async execute({ user_student_id, skip, limit }: IExecute): Promise<IResponseFindRatingImc> {
    return await this.ratingImcRepository.find({ user_student_id, skip, limit })
  }
}
