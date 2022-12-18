"use strict";

require("dotenv/config");
require("reflect-metadata");
require("express-async-errors");
require("../typeorm");
require("../../container");
var _express = _interopRequireDefault(require("express"));
var _cors = require("../../../config/cors");
var _cors2 = _interopRequireDefault(require("cors"));
var _routes = require("./routes");
var _celebrate = require("celebrate");
var _AppError = require("../../errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors2.default)(_cors.corsOptions));
app.use(_express.default.json());
app.use(_routes.router);
app.use((0, _celebrate.errors)());
app.use((error, request, response, next) => {
  if (error instanceof _AppError.AppError) {
    return response.status(error.status_code).json({
      message: error.message,
      status_code: error.status_code
    });
  }
  return response.status(500).json({
    message: `Internal server error - ${error.message}`,
    status_code: 500
  });
});
app.listen(process.env.PORT, () => {
  console.log('🚀 Servidor em execução');
});