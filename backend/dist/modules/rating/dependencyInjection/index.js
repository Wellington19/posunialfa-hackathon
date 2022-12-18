"use strict";

var _tsyringe = require("tsyringe");
var _RatingImcRepository = require("../infra/typeorm/repositories/RatingImcRepository");
_tsyringe.container.registerSingleton('RatingImcRepository', _RatingImcRepository.RatingImcRepository);