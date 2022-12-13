import { celebrate, Segments, Joi } from 'celebrate'

export const createRatingImc = celebrate({
  [Segments.BODY]: {
    height: Joi.number().positive().required().strict(),
    weight: Joi.number().positive().required().strict(),
    user_rating_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    user_student_id: Joi.string().uuid({ version: 'uuidv4' }).required()
  }
})

export const findRatingImc = celebrate({
  [Segments.QUERY]: {
    user_student_id: Joi.string().uuid({ version: 'uuidv4' }),
    skip: Joi.number().positive().integer().allow(0).required(),
    limit: Joi.number().positive().integer().allow(0).required()
  }
})

export const patchRatingImc = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid({ version: 'uuidv4' }).required()
  },
  [Segments.BODY]: {
    height: Joi.number().positive().strict(),
    weight: Joi.number().positive().strict(),
    user_rating_id: Joi.string().uuid({ version: 'uuidv4' }),
    user_student_id: Joi.string().uuid({ version: 'uuidv4' })
  }
})

export const deleteRatingImc = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid({ version: 'uuidv4' }).required()
  }
})




