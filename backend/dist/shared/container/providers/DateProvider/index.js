"use strict";

var _tsyringe = require("tsyringe");
var _DateProvider = _interopRequireDefault(require("./implementations/DateProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_tsyringe.container.registerSingleton('DateProvider', _DateProvider.default);