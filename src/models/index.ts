import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import {UserAttributes, UserInstance} from './interfaces/user';
import {RoleAttributes, RoleInstance} from './interfaces/role';
import {PermissionAttributes, PermissionInstance} from './interfaces/permission';
import {PostAttributes, PostInstance} from './interfaces/post';
import {CommentAttributes, CommentInstance} from './interfaces/comment';
import {ResetPasswordTokenAttributes, ResetPasswordTokenInstance} from './interfaces/reset_password_token';
import {RolePermissionAttributes, RolePermissionInstance} from './interfaces/role_permission';
import {UserRoleAttributes, UserRoleInstance} from './interfaces/user_role';
import {Sequelize} from 'sequelize';


export interface SequelizeModels {
  User: SequelizeStatic.Model<UserInstance, UserAttributes>;
  Role: SequelizeStatic.Model<RoleInstance, RoleAttributes>;
  UserRole:  SequelizeStatic.Model<UserRoleInstance, UserRoleAttributes>;
  Permission: SequelizeStatic.Model<PermissionInstance, PermissionAttributes>;
  RolePermission: SequelizeStatic.Model<RolePermissionInstance, RolePermissionAttributes>;
  Post: SequelizeStatic.Model<PostInstance, PostInstance>;
  Comment: SequelizeStatic.Model<UserInstance, CommentAttributes>;
  ResetPasswordToken: SequelizeStatic.Model<ResetPasswordTokenInstance, ResetPasswordTokenAttributes>;
}

export interface DbEnvConfig {
  database: string,
  username: string,
  password: string,
  host: string,
  operatorsAliases: boolean,
  storage?: string
}

export interface DbConfig {
  [key: string]: DbEnvConfig;
}

const dbConfig: DbConfig = require('../config/database');
const env: string = process.env.NODE_ENV || 'development';
const config: DbEnvConfig = dbConfig[env];
const basename: string = path.basename(module.filename);

const _sequelize: Sequelize = new SequelizeStatic(
  config.database, config.username, config.password, 
  {...config, operatorsAliases: false, logging: false}
);

let _models: any = {};
const files: Array<string> = fs.readdirSync(__dirname);

files.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) 
         && (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
         && (file !== 'interfaces');
  }).forEach(file  => {
    let model: any = _sequelize.import(path.join(__dirname, file));
    _models[model.name] = model;
  });

_models.Comment.belongsTo(_models.Post);
_models.Post.hasMany(_models.Comment, {as: 'comments', onDelete: 'CASCADE'});
_models.Post.belongsTo(_models.User);
_models.User.hasMany(_models.Post, {as: 'posts', onDelete: 'CASCADE'});
_models.User.hasMany(_models.ResetPasswordToken, { as: 'reset_password_tokens', onDelete: 'CASCADE'});
_models.Comment.belongsTo(_models.User);
_models.User.hasMany(_models.Comment, {as: 'comments', onDelete: 'CASCADE'});
_models.Role.belongsToMany(_models.User, { through: _models.UserRole, as: 'users', onDelete: 'CASCADE',individualHooks: true});
_models.User.belongsToMany(_models.Role, { through: _models.UserRole, as: 'roles', onDelete: 'CASCADE',individualHooks: true});
_models.Role.belongsToMany(_models.Permission, { through: _models.RolePermission, as: 'permissions', onDelete: 'CASCADE',individualHooks: true});
_models.Permission.belongsToMany(_models.Role, { through: _models.RolePermission, as: 'roles', onDelete: 'CASCADE',individualHooks: true});

export const models: SequelizeModels = _models;
export const sequelize: Sequelize = _sequelize;