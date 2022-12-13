import { RatingImc } from '../infra/typeorm/entities/RatingImc'

export interface IResponseFindRatingImc {
  ratings: RatingImc[]
  totalCount: number
}