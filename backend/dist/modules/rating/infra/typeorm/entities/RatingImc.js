"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RatingImc = void 0;
var _User = require("../../../../user/infra/typeorm/entities/User");
var _typeorm = require("typeorm");
var _uuid = require("uuid");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let RatingImc = (_dec = (0, _typeorm.Entity)('rating_imc'), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec4 = (0, _typeorm.PrimaryColumn)({
  type: 'nchar',
  length: 36
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  type: 'numeric',
  precision: 19,
  scale: 6
}), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.Column)({
  type: 'numeric',
  precision: 19,
  scale: 6
}), _dec9 = Reflect.metadata("design:type", Number), _dec10 = (0, _typeorm.Column)({
  type: 'numeric',
  precision: 19,
  scale: 6
}), _dec11 = Reflect.metadata("design:type", Number), _dec12 = (0, _typeorm.Column)({
  type: 'nvarchar',
  length: 30
}), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)({
  type: 'nvarchar',
  length: 10
}), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)({
  type: 'nchar',
  length: 36
}), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)({
  type: 'nchar',
  length: 36
}), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.CreateDateColumn)({
  type: 'datetime'
}), _dec21 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec22 = (0, _typeorm.OneToOne)(() => _User.User, user => user.user_rating), _dec23 = Reflect.metadata("design:type", typeof _User.User === "undefined" ? Object : _User.User), _dec24 = (0, _typeorm.OneToOne)(() => _User.User, user => user.user_student), _dec25 = Reflect.metadata("design:type", typeof _User.User === "undefined" ? Object : _User.User), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class RatingImc {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "height", _descriptor2, this);
    _initializerDefineProperty(this, "weight", _descriptor3, this);
    _initializerDefineProperty(this, "imc", _descriptor4, this);
    _initializerDefineProperty(this, "classification", _descriptor5, this);
    _initializerDefineProperty(this, "degree", _descriptor6, this);
    _initializerDefineProperty(this, "user_rating_id", _descriptor7, this);
    _initializerDefineProperty(this, "user_student_id", _descriptor8, this);
    _initializerDefineProperty(this, "created_at", _descriptor9, this);
    _initializerDefineProperty(this, "user_rating", _descriptor10, this);
    _initializerDefineProperty(this, "user_student", _descriptor11, this);
    if (!this.id) this.id = (0, _uuid.v4)();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "weight", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "imc", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "classification", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "degree", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user_rating_id", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "user_student_id", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "user_rating", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "user_student", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
exports.RatingImc = RatingImc;