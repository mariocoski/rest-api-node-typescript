import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {RoleAttributes, RoleInstance} from "./interfaces/role";
import {SequelizeModels} from './index';
export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<RoleInstance, RoleAttributes> => {
  const Role = sequelize.define<RoleInstance, RoleAttributes>("Role", {
    userId: dataTypes.INTEGER,
    name: dataTypes.STRING,
    description: dataTypes.STRING,
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
    tableName: 'roles',
    indexes: [],
    classMethods: {
      associate(models: SequelizeModels){
        Role.belongsToMany(models.User,{
          through: 'user_role',
          foreignKey: 'role_id',
          as: 'users'
        });
      }
    }
  });

  return Role;
}