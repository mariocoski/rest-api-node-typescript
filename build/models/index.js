"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var SequelizeStatic = require("sequelize");
var dbConfig = require('../config/database');
var env = process.env.NODE_ENV || 'development';
var config = dbConfig[env];
var basename = path.basename(module.filename);
var _sequelize = new SequelizeStatic(config.database, config.username, config.password, __assign({}, config, { operatorsAliases: false, logging: false }));
var _models = {};
var files = fs.readdirSync(__dirname);
files.filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename)
        && (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
        && (file !== 'interfaces');
}).forEach(function (file) {
    var model = _sequelize.import(path.join(__dirname, file));
    _models[model.name] = model;
});
_models.Comment.belongsTo(_models.Post);
_models.Post.hasMany(_models.Comment, { as: 'comments', onDelete: 'CASCADE' });
_models.Post.belongsTo(_models.User);
_models.User.hasMany(_models.Post, { as: 'posts', onDelete: 'CASCADE' });
_models.User.hasMany(_models.ResetPasswordToken, { as: 'reset_password_tokens', onDelete: 'CASCADE' });
_models.Comment.belongsTo(_models.User);
_models.User.hasMany(_models.Comment, { as: 'comments', onDelete: 'CASCADE' });
_models.Role.belongsToMany(_models.User, { through: _models.UserRole, as: 'users', onDelete: 'CASCADE', individualHooks: true });
_models.User.belongsToMany(_models.Role, { through: _models.UserRole, as: 'roles', onDelete: 'CASCADE', individualHooks: true });
_models.Role.belongsToMany(_models.Permission, { through: _models.RolePermission, as: 'permissions', onDelete: 'CASCADE', individualHooks: true });
_models.Permission.belongsToMany(_models.Role, { through: _models.RolePermission, as: 'roles', onDelete: 'CASCADE', individualHooks: true });
exports.models = _models;
exports.sequelize = _sequelize;
//# sourceMappingURL=index.js.map