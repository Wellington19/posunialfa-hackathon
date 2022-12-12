import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  id: string
  name?: string,
  username?: string,
  password?: string,
  profile?: string,
  situation?: string
}

@injectable()
export class PatchUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute({
    id,
    name,
    username,
    password,
    profile,
    situation
  }: IExecute): Promise<void> {
    let user = await this.userRepository.findById(id)
    if (!user) throw new AppError('Usuário não existe na base de dados', 404)

    if (username) {
      user = await this.userRepository.findByUsername(username)
      if (user.id !== id) throw new AppError(`Usuário de acesso já cadastrado para o usuário: ${user.name}`)
    }

    await this.userRepository.update({
      id,
      name,
      username,
      password: password ? await hash(password, 8) : '',
      profile,
      situation
    })
  }
}
