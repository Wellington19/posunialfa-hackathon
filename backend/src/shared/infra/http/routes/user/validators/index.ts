import { celebrate, Segments, Joi } from 'celebrate'

export const createUser = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().max(60),
    username: Joi.string().required().max(60),
    password: Joi.string().required().min(8),
    profile: Joi.string().required().valid('Administrador', 'Professor', 'Aluno'),
    situation: Joi.string().required().valid('A', 'I')
  }
})

export const findUser = celebrate({
  [Segments.QUERY]: {
    skip: Joi.number().positive().integer().allow(0).required(),
    limit: Joi.number().positive().integer().allow(0).required()
  }
})

export const patchUser = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid({ version: 'uuidv4' }).required()
  },
  [Segments.BODY]: {
    name: Joi.string().max(60),
    username: Joi.string().max(60),
    password: Joi.string().min(8),
    profile: Joi.string().valid('Administrador', 'Professor', 'Aluno'),
    situation: Joi.string().valid('A', 'I')
  }
})

export const deleteUser = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid({ version: 'uuidv4' }).required()
  }
})




