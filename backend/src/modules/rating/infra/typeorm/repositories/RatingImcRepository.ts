import { Repository } from 'typeorm'
import { MyDBDataSource } from '@shared/infra/typeorm/dataSource'

import { RatingImc } from '@modules/rating/infra/typeorm/entities/RatingImc'
import { IRatingImcRepository } from '@modules/rating/repositories/IRatingImcRepository'
import { ICreateRatingImcDTO } from '@modules/rating/dtos/ICreateRatingImcDTO'
import { IFindRatingImcDTO } from '@modules/rating/dtos/IFindRatingImcDTO'
import { IResponseFindRatingImc } from '@modules/rating/dtos/IResponse'
import { IUpdateRatingImcDTO } from '@modules/rating/dtos/IUpdateRatingImcDTO'

export class RatingImcRepository implements IRatingImcRepository {
  private repository: Repository<RatingImc>

  constructor() {
    this.repository = MyDBDataSource.getRepository(RatingImc)
  }

  async create({
    height,
    weight,
    imc,
    classification,
    degree,
    user_rating_id,
    user_student_id
  }: ICreateRatingImcDTO): Promise<void> {
    const rating = this.repository.create({
      height,
      weight,
      imc,
      classification,
      degree,
      user_rating_id,
      user_student_id
    })

    await this.repository.save(rating)
  }

  async find({ user_rating_id, user_student_id, skip, limit }: IFindRatingImcDTO): Promise<IResponseFindRatingImc> {
    const [ratings, totalCount] = await this.repository.findAndCount({
      where: { user_rating_id, user_student_id },
      order: { created_at: 'DESC' },
      skip,
      take: limit
    })

    return { ratings, totalCount }
  }

  async findById(id: string): Promise<RatingImc> {
    return await this.repository.findOneBy({ id })
  }

  async update({
    id,
    height,
    weight,
    imc,
    classification,
    degree,
    user_rating_id,
    user_student_id
  }: IUpdateRatingImcDTO): Promise<void> {
    let objUpdate = {}
    height ? objUpdate = { ...objUpdate, height } : objUpdate
    weight ? objUpdate = { ...objUpdate, weight } : objUpdate
    imc ? objUpdate = { ...objUpdate, imc } : objUpdate
    classification ? objUpdate = { ...objUpdate, classification } : objUpdate
    degree ? objUpdate = { ...objUpdate, degree } : objUpdate
    user_rating_id ? objUpdate = { ...objUpdate, user_rating_id } : objUpdate
    user_student_id ? objUpdate = { ...objUpdate, user_student_id } : objUpdate

    if (!(Object.keys(objUpdate).length === 0)) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set(objUpdate)
        .where('id = :id', { id })
        .execute()
    }
  }

  async delete(id: string): Promise<void> {
    const rating = await this.repository.findOneBy({ id })

    await this.repository.remove(rating)
  }
}
