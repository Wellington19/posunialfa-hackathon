"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
const corsOptions = {
  origin: ['http://localhost:3000', 'https://posunialfa-hackathon.vercel.app'],
  exposedHeaders: ['Authorization', 'x-total-count']
};
exports.corsOptions = corsOptions;