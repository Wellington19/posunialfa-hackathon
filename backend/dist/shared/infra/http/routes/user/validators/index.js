"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchUser = exports.findUser = exports.deleteUser = exports.createUser = void 0;
var _celebrate = require("celebrate");
const createUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required().max(60),
    username: _celebrate.Joi.string().required().max(60),
    password: _celebrate.Joi.string().required().min(8),
    profile: _celebrate.Joi.string().required().valid('Administrador', 'Professor', 'Aluno'),
    situation: _celebrate.Joi.string().required().valid('A', 'I')
  }
});
exports.createUser = createUser;
const findUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    profile: _celebrate.Joi.string().valid('Administrador', 'Professor', 'Aluno'),
    skip: _celebrate.Joi.number().positive().integer().allow(0),
    limit: _celebrate.Joi.number().positive().integer().allow(0)
  }
});
exports.findUser = findUser;
const patchUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required()
  },
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().max(60),
    username: _celebrate.Joi.string().max(60),
    password: _celebrate.Joi.string().min(8),
    profile: _celebrate.Joi.string().valid('Administrador', 'Professor', 'Aluno'),
    situation: _celebrate.Joi.string().valid('A', 'I')
  }
});
exports.patchUser = patchUser;
const deleteUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required()
  }
});
exports.deleteUser = deleteUser;