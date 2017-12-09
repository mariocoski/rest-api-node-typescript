import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {RolePermissionAttributes, RolePermissionInstance} from "./interfaces/role_permission";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<RolePermissionInstance, RolePermissionAttributes> => {
  const RolePermission = sequelize.define<RolePermissionInstance, RolePermissionAttributes>("RolePermission", {
    roleId: dataTypes.INTEGER,
    permissionId: dataTypes.INTEGER,
    deletedAt: {
      type: dataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    tableName: 'role_permission',
  });

  return RolePermission;
}

