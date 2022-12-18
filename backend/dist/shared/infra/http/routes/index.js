"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _rating = require("./rating");
var _session = require("./session");
var _user = require("./user");
const router = (0, _express.Router)();
exports.router = router;
router.use('/rating', _rating.ratingRoutes);
router.use('/session', _session.sessionRoutes);
router.use('/user', _user.userRoutes);