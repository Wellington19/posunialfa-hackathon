import { inject, injectable } from 'tsyringe'

import { User } from '@modules/user/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/user/repositories/IUserRepository'

interface IExecute {
  user_requisition_id: string
}

@injectable()
export class FindUserMeUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute({ user_requisition_id }: IExecute): Promise<User> {
    return await this.userRepository.findById(user_requisition_id)
  }
}
