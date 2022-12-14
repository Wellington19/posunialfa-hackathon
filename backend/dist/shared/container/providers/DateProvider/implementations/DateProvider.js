"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dayjs.default.extend(_utc.default);
class DateProvider {
  addHours(hours) {
    return (0, _dayjs.default)().add(hours, 'hour').toDate();
  }
}
exports.default = DateProvider;