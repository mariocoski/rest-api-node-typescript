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
        && (file !== "interfaces");
}).forEach(function (file) {
    var model = _sequelize.import(path.join(__dirname, file));
    _models[model.name] = model;
});
_models.comment.belongsTo(_models.post);
_models.post.hasMany(_models.comment);
_models.post.belongsTo(_models.user);
_models.user.hasMany(_models.post);
_models.Role.belongsToMany(_models.user, { through: _models.UserRole, as: 'users' });
_models.user.belongsToMany(_models.Role, { through: _models.UserRole, as: 'roles' });
exports.models = _models;
exports.sequelize = _sequelize;
//# sourceMappingURL=index.js.map