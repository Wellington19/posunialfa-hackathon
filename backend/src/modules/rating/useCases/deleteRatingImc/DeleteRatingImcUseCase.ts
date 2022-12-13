import { inject, injectable } from 'tsyringe'

import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteRatingImcUseCase {
  constructor(
    @inject('RatingImcRepository')
    private ratingImcRepository: IRatingImcRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const rating = await this.ratingImcRepository.findById(id)
    if (!rating) throw new AppError('Avaliação não existe na base de dados', 404)

    await this.ratingImcRepository.delete(id)
  }
}
