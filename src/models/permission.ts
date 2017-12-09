import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {PermissionAttributes, PermissionInstance} from "./interfaces/permission";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<PermissionInstance, PermissionAttributes> => {
  const Permission = sequelize.define<PermissionInstance, PermissionAttributes>("Permission", {
    userId: dataTypes.INTEGER,
    title: dataTypes.STRING,
    body: dataTypes.STRING,
    createdAt: {
      type: dataTypes.DATE,
      field: 'created_at',
      defaultValue: dataTypes.NOW 
    },
    updatedAt: {
      type: dataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: dataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    tableName: 'permissions',
    indexes: [],
    classMethods: {
      associate(models: SequelizeModels){
        Permission.belongsToMany(models.Role,{
          through: 'role_permission',
          foreignKey: 'permission_id',
          as: 'permissions'
        });
      }
    }
  });

  return Permission;
}