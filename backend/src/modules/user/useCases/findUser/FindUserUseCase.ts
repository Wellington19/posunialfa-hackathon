import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@modules/user/repositories/IUserRepository'
import { IResponseFindUser } from '@modules/user/dtos/IResponse'

interface IExecute {
  profile?: string
  skip?: number
  limit?: number
}

@injectable()
export class FindUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute({ profile, skip, limit }: IExecute): Promise<IResponseFindUser> {
    return await this.userRepository.find({ profile, skip, limit })
  }
}
