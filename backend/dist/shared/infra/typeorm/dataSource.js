"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyDBDataSource = void 0;
require("dotenv/config");
var _path = _interopRequireDefault(require("path"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const basePath = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const extensionPath = process.env.NODE_ENV === 'production' ? '*.js' : '*.ts';
const MyDBDataSource = new _typeorm.DataSource({
  type: 'mysql',
  url: process.env.JAWSDB_URL,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
  logging: false,
  entities: [_path.default.resolve(process.cwd(), basePath, 'modules', '**', 'infra', 'typeorm', 'entities', extensionPath)],
  migrations: [_path.default.resolve(process.cwd(), basePath, 'shared', 'infra', 'typeorm', 'migrations', extensionPath)]
});
exports.MyDBDataSource = MyDBDataSource;