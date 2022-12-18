import { inject, injectable } from 'tsyringe'

import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  id: string
  height?: number
  weight?: number
  user_rating_id?: string
  user_student_id?: string
}

@injectable()
export class PatchRatingImcUseCase {
  height: number
  weight: number
  imc: number
  classification: TClassification
  degree: TDegree

  constructor(
    @inject('RatingImcRepository')
    private ratingImcRepository: IRatingImcRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute({
    id,
    height,
    weight,
    user_rating_id,
    user_student_id
  }: IExecute): Promise<void> {
    const rating = await this.ratingImcRepository.findById(id)
    if (!rating) throw new AppError('Avaliação não existe na base de dados', 404)

    if (user_student_id) {
      const user = await this.userRepository.findById(user_student_id)
      if (!user) throw new AppError('Aluno não existe na base de dados', 404)

      if (user.profile !== 'Aluno') throw new AppError('Usuário informado não tem perfil de aluno', 400)
      if (user.situation !== 'A') throw new AppError('Não é permitido cadastrar avaliação para aluno inativo', 400)
    }

    if (user_rating_id) {
      const user = await this.userRepository.findById(user_rating_id)
      if (!user) throw new AppError('Usuário avaliador não existe na base de dados', 404)

      if (user.situation !== 'A') throw new AppError('Não é permitido cadastrar avaliação com um avaliador inativo', 400)
    }

    if (height || weight) {
      this.height = Number(height ?? rating.height)
      this.weight = Number(weight ?? rating.weight)
      this.classification = rating.classification as TClassification
      this.degree = rating.degree as TDegree
      this.imc = Number((this.weight / (this.height * this.height)).toFixed(2))

      if (this.imc > 18.5 && this.imc <= 24.99) this.classification = 'NORMAL'
      else if (this.imc >= 25 && this.imc <= 29.99) this.classification = 'SOBREPESO'
      else if (this.imc >= 30) {
        this.classification = 'OBESIDADE'
        if (this.imc <= 34.99) this.degree = 'I'
        else if (this.imc <= 39.99) this.degree = 'II'
        else if (this.imc > 40) this.degree = 'III'
      }
    }

    await this.ratingImcRepository.update({
      id,
      height: this.height,
      weight: this.weight,
      imc: this.imc,
      classification: this.classification,
      degree: this.degree,
      user_rating_id,
      user_student_id
    })
  }
}
