"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = require("express");
var _isAuthenticated = require("../../middlewares/isAuthenticated");
var v = _interopRequireWildcard(require("./validators"));
var _CreateUserController = require("../../../../../modules/user/useCases/createUser/CreateUserController");
var _FindUserController = require("../../../../../modules/user/useCases/findUser/FindUserController");
var _FindUserMeController = require("../../../../../modules/user/useCases/findUserMe/FindUserMeController");
var _PatchUserController = require("../../../../../modules/user/useCases/patchUser/PatchUserController");
var _DeleteUserController = require("../../../../../modules/user/useCases/deleteUser/DeleteUserController");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createUserController = new _CreateUserController.CreateUserController();
const findUserController = new _FindUserController.FindUserController();
const findUserMeController = new _FindUserMeController.FindUserMeController();
const patchUserController = new _PatchUserController.PatchUserController();
const deleteUserController = new _DeleteUserController.DeleteUserController();
const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
userRoutes.use(_isAuthenticated.ensureAuthenticated);
userRoutes.post('/', v.createUser, createUserController.handle);
userRoutes.get('/', v.findUser, findUserController.handle);
userRoutes.get('/me', findUserMeController.handle);
userRoutes.patch('/:id', v.patchUser, patchUserController.handle);
userRoutes.delete('/:id', v.deleteUser, deleteUserController.handle);