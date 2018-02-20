import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {RolePermissionAttributes, RolePermissionInstance} from "./interfaces/role_permission";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<RolePermissionInstance, RolePermissionAttributes> => {
  const RolePermission = sequelize.define<RolePermissionInstance, RolePermissionAttributes>("RolePermission", {
    id: {
      type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_id:{type: dataTypes.INTEGER, unique: false},
    permission_id: {type: dataTypes.INTEGER, unique: false},
  }, {
    tableName: 'role_permission',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  });

  return RolePermission;
}

