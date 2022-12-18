"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
const corsOptions = {
  origin: ['http://localhost:3000'],
  exposedHeaders: ['Authorization', 'x-total-count']
};
exports.corsOptions = corsOptions;