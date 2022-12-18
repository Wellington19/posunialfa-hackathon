"use strict";

var _tsyringe = require("tsyringe");
var _UserRepository = require("../infra/typeorm/repositories/UserRepository");
var _UserTokenRepository = require("../infra/typeorm/repositories/UserTokenRepository");
_tsyringe.container.registerSingleton('UserRepository', _UserRepository.UserRepository);
_tsyringe.container.registerSingleton('UserTokenRepository', _UserTokenRepository.UserTokenRepository);