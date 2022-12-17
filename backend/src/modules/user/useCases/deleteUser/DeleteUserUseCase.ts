import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('RatingImcRepository')
    private ratingImcRepository: IRatingImcRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new AppError('Usuário não existe na base de dados', 404)

    const hasStudentHistoric = await this.ratingImcRepository.find({ user_student_id: user.id, skip: 0, limit: 1 })
    const hasRatingHistoric = await this.ratingImcRepository.find({ user_rating_id: user.id, skip: 0, limit: 1 })

    if (hasStudentHistoric.totalCount || hasRatingHistoric.totalCount)
      throw new AppError('Não é possível excluir o usuário, ele possui histórico de avaliações')

    await this.userRepository.delete(id)
  }
}
