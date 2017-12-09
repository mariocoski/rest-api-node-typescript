import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {UserRoleAttributes, UserRoleInstance} from "./interfaces/user_role";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<UserRoleInstance, UserRoleAttributes> => {
  const UserRole = sequelize.define<UserRoleInstance, UserRoleAttributes>("UserRole", {
    userId: dataTypes.INTEGER,
    roleId: dataTypes.INTEGER,
    deletedAt: {
      type: dataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    tableName: 'user_role',
  });

  return UserRole;
}

