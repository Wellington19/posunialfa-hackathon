import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new AppError('Usuário não existe na base de dados', 404)

    /**
     * TODO: Buscar se o usuário tem avaliação de imc ou foi o responsável por incluir a informação de uma avaliação,
     * se sim não permite a exclusão
     */

    await this.userRepository.delete(id)
  }
}
