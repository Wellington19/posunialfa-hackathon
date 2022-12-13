import { RatingImc } from '../infra/typeorm/entities/RatingImc'
import { ICreateRatingImcDTO } from '../dtos/ICreateRatingImcDTO'
import { IFindRatingImcDTO } from '../dtos/IFindRatingImcDTO'
import { IUpdateRatingImcDTO } from '../dtos/IUpdateRatingImcDTO'
import { IResponseFindRatingImc } from '../dtos/IResponse'

export interface IRatingImcRepository {
  create(data: ICreateRatingImcDTO): Promise<void>
  find(data: IFindRatingImcDTO): Promise<IResponseFindRatingImc>
  findById(id: string): Promise<RatingImc>
  update(data: IUpdateRatingImcDTO): Promise<void>
  delete(id: string): Promise<void>
}
