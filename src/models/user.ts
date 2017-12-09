import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize, Instance} from "sequelize";
import {UserAttributes, UserInstance} from "./interfaces/user";
import {SequelizeModels} from './index';
export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<UserInstance, UserAttributes> => {
  
  const User = sequelize.define<UserInstance, UserAttributes>("user", {
    firstname: dataTypes.STRING,
    lastname: dataTypes.STRING,
    bio: dataTypes.TEXT,
    email: {
      type: dataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: dataTypes.STRING,
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [],
    paranoid: true,
    underscored: true
  });
  User.beforeCreate(async (user: any, options: object) => {
    user.password = 'hash';
    return user;
  });
  return User;
}