import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {RoleAttributes, RoleInstance} from "./interfaces/role";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<RoleInstance, RoleAttributes> => {
  const Role = sequelize.define<RoleInstance, RoleAttributes>("Role", {
    name: {type: dataTypes.STRING, unique: true},
    description: dataTypes.STRING,
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [],
    paranoid: true,
    underscored: true
  });

  // Role.afterDestroy((role: RoleInstance, options: Object) => {
  //   sequelize.models.UserRole.destroy({where: {role_id: role.dataValues.id}, individualHooks: true}); 
  //   sequelize.models.RolePermission.destroy({where: {role_id: role.dataValues.id}, individualHooks: true}); 
  // });

  return Role;
}