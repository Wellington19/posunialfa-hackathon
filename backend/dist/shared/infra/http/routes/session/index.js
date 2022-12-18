"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionRoutes = void 0;
var _express = require("express");
var v = _interopRequireWildcard(require("./validators"));
var _AuthenticateUserController = require("../../../../../modules/session/useCases/authenticateUser/AuthenticateUserController");
var _RefreshTokenController = require("../../../../../modules/session/useCases/refreshToken/RefreshTokenController");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
const sessionRoutes = (0, _express.Router)();
exports.sessionRoutes = sessionRoutes;
sessionRoutes.post('/', v.authenticateUser, authenticateUserController.handle);
sessionRoutes.post('/refresh-token', v.refreshToken, refreshTokenController.handle);