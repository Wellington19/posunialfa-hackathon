import { container } from 'tsyringe'

import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { RatingImcRepository } from '@modules/rating/infra/typeorm/repositories/RatingImcRepository'
container.registerSingleton<IRatingImcRepository>(
  'RatingImcRepository',
  RatingImcRepository
)