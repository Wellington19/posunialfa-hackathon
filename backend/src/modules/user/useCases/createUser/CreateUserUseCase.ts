import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

interface IExecute {
  name: string
  username: string
  password: string
  profile: string
  situation: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }
  async execute({ name, username, password, profile, situation }: IExecute): Promise<void> {
    const user = await this.userRepository.findByUsername(username)
    if (user) throw new AppError(`Usuário ${username} já cadastrado para o usuário: ${user.name}`)

    const passwordHash = await hash(password, 8)
    await this.userRepository.create({ name, username, password: passwordHash, profile, situation })
  }
}
