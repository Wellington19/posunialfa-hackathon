import { inject, injectable } from 'tsyringe'

import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  height: number
  weight: number
  user_rating_id: string
  user_student_id: string
}

@injectable()
export class CreateRatingImcUseCase {
  constructor(
    @inject('RatingImcRepository')
    private ratingImcRepository: IRatingImcRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }
  async execute({
    height,
    weight,
    user_rating_id,
    user_student_id
  }: IExecute): Promise<void> {
    let user = await this.userRepository.findById(user_student_id)
    if (!user) throw new AppError('Aluno não existe na base de dados', 404)
    if (user.profile !== 'Aluno') throw new AppError('Usuário informado não tem perfil de aluno', 400)
    if (user.situation !== 'A') throw new AppError('Não é permitido cadastrar avaliação para aluno inativo', 400)

    user = await this.userRepository.findById(user_rating_id)
    if (!user) throw new AppError('Usuário avaliador não existe na base de dados', 404)
    if (user.situation !== 'A') throw new AppError('Não é permitido cadastrar avaliação com um avaliador inativo', 400)

    let classification: TClassification = 'BAIXO PESO'
    let degree: TDegree = '0'
    const imc = Number((weight / (height * height)).toFixed(2))

    if (imc > 18.5 && imc <= 24.99) classification = 'NORMAL'
    else if (imc >= 25 && imc <= 29.99) classification = 'SOBREPESO'
    else if (imc >= 30) {
      classification = 'OBESIDADE'
      if (imc <= 34.99) degree = 'I'
      else if (imc <= 39.99) degree = 'II'
      else if (imc > 40) degree = 'III'
    }

    await this.ratingImcRepository.create({
      height,
      weight,
      imc,
      classification,
      degree,
      user_rating_id,
      user_student_id
    })
  }
}
