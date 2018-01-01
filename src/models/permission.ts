import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {PermissionAttributes, PermissionInstance} from "./interfaces/permission";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<PermissionInstance, PermissionAttributes> => {
  const Permission = sequelize.define<PermissionInstance, PermissionAttributes>("Permission", {
    name: {type: dataTypes.STRING, unique: true},
    label: dataTypes.STRING,
    description: dataTypes.STRING,
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [],
    paranoid: true,
    underscored: true
  });

  return Permission;
}