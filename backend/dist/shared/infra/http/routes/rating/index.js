"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ratingRoutes = void 0;
var _express = require("express");
var _isAuthenticated = require("../../middlewares/isAuthenticated");
var v = _interopRequireWildcard(require("./validators"));
var _CreateRatingImcController = require("../../../../../modules/rating/useCases/createRatingImc/CreateRatingImcController");
var _FindRatingImcController = require("../../../../../modules/rating/useCases/findRatingImc/FindRatingImcController");
var _PatchRatingImcController = require("../../../../../modules/rating/useCases/patchRatingImc/PatchRatingImcController");
var _DeleteRatingImcController = require("../../../../../modules/rating/useCases/deleteRatingImc/DeleteRatingImcController");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createRatingImcController = new _CreateRatingImcController.CreateRatingImcController();
const findRatingImcController = new _FindRatingImcController.FindRatingImcController();
const patchRatingImcController = new _PatchRatingImcController.PatchRatingImcController();
const deleteRatingImcController = new _DeleteRatingImcController.DeleteRatingImcController();
const ratingRoutes = (0, _express.Router)();
exports.ratingRoutes = ratingRoutes;
ratingRoutes.use(_isAuthenticated.ensureAuthenticated);
ratingRoutes.post('/imc', v.createRatingImc, createRatingImcController.handle);
ratingRoutes.get('/imc', v.findRatingImc, findRatingImcController.handle);
ratingRoutes.patch('/imc/:id', v.patchRatingImc, patchRatingImcController.handle);
ratingRoutes.delete('/imc/:id', v.deleteRatingImc, deleteRatingImcController.handle);