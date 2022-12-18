"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchRatingImc = exports.findRatingImc = exports.deleteRatingImc = exports.createRatingImc = void 0;
var _celebrate = require("celebrate");
const createRatingImc = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    height: _celebrate.Joi.number().positive().required().strict(),
    weight: _celebrate.Joi.number().positive().required().strict(),
    user_rating_id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required(),
    user_student_id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required()
  }
});
exports.createRatingImc = createRatingImc;
const findRatingImc = (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    user_student_id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }),
    skip: _celebrate.Joi.number().positive().integer().allow(0).required(),
    limit: _celebrate.Joi.number().positive().integer().allow(0).required()
  }
});
exports.findRatingImc = findRatingImc;
const patchRatingImc = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required()
  },
  [_celebrate.Segments.BODY]: {
    height: _celebrate.Joi.number().positive().strict(),
    weight: _celebrate.Joi.number().positive().strict(),
    user_rating_id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }),
    user_student_id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    })
  }
});
exports.patchRatingImc = patchRatingImc;
const deleteRatingImc = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid({
      version: 'uuidv4'
    }).required()
  }
});
exports.deleteRatingImc = deleteRatingImc;