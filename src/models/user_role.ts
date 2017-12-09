import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {UserRoleAttributes, UserRoleInstance} from "./interfaces/user_role";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<UserRoleInstance, UserRoleAttributes> => {
  const UserRole = sequelize.define<UserRoleInstance, UserRoleAttributes>("UserRole", {
    userId:{
      type: dataTypes.INTEGER,
      field: 'user_id'
    },
    roleId:{
      type: dataTypes.INTEGER,
      field: 'role_id'
    },
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'user_role',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    underscored: true
  });

  return UserRole;
}

