"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RatingImcRepository = void 0;
var _dataSource = require("../../../../../shared/infra/typeorm/dataSource");
var _RatingImc = require("../entities/RatingImc");
class RatingImcRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.MyDBDataSource.getRepository(_RatingImc.RatingImc);
  }
  async create({
    height,
    weight,
    imc,
    classification,
    degree,
    user_rating_id,
    user_student_id
  }) {
    const rating = this.repository.create({
      height,
      weight,
      imc,
      classification,
      degree,
      user_rating_id,
      user_student_id
    });
    await this.repository.save(rating);
  }
  async find({
    user_rating_id,
    user_student_id,
    skip,
    limit
  }) {
    const {
      manager
    } = this.repository;
    let query = `
      SELECT T0.*, T1.name as user_rating_name, T2.name as user_student_name FROM rating_imc T0      
    `;
    let queryCount = `
      SELECT COUNT(*) as totalCount FROM rating_imc T0
    `;
    let joins = `
      INNER JOIN users T1 ON T0.user_rating_id = T1.id 
      INNER JOIN users T2 ON T0.user_student_id = T2.id
      WHERE 1 = 1
    `;
    query += joins;
    queryCount += joins;
    if (user_rating_id) {
      query += ` AND T0.user_rating_id = '${user_rating_id}'`;
      queryCount += ` AND T0.user_rating_id = '${user_rating_id}'`;
    }
    if (user_student_id) {
      query += ` AND T0.user_student_id = '${user_student_id}'`;
      queryCount += ` AND T0.user_student_id = '${user_student_id}'`;
    }
    query += ` ORDER BY T0.created_at`;
    query += ` LIMIT ${skip}, ${limit}`;
    const ratings = await manager.query(query);
    const totalRecords = await manager.query(queryCount);
    const totalCount = Number(totalRecords[0].totalCount);
    return {
      ratings,
      totalCount
    };
  }
  async findById(id) {
    return await this.repository.findOneBy({
      id
    });
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
  }) {
    let objUpdate = {};
    height ? objUpdate = {
      ...objUpdate,
      height
    } : objUpdate;
    weight ? objUpdate = {
      ...objUpdate,
      weight
    } : objUpdate;
    imc ? objUpdate = {
      ...objUpdate,
      imc
    } : objUpdate;
    classification ? objUpdate = {
      ...objUpdate,
      classification
    } : objUpdate;
    degree ? objUpdate = {
      ...objUpdate,
      degree
    } : objUpdate;
    user_rating_id ? objUpdate = {
      ...objUpdate,
      user_rating_id
    } : objUpdate;
    user_student_id ? objUpdate = {
      ...objUpdate,
      user_student_id
    } : objUpdate;
    if (!(Object.keys(objUpdate).length === 0)) {
      await this.repository.createQueryBuilder().update().set(objUpdate).where('id = :id', {
        id
      }).execute();
    }
  }
  async delete(id) {
    const rating = await this.repository.findOneBy({
      id
    });
    await this.repository.remove(rating);
  }
}
exports.RatingImcRepository = RatingImcRepository;