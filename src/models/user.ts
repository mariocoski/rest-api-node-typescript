import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize, Instance} from "sequelize";
import {UserAttributes, UserInstance} from "./interfaces/user";
import {SequelizeModels} from './index';
export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<UserInstance, UserAttributes> => {
  
  const User = sequelize.define<UserInstance, UserAttributes>("User", {
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
    underscored: true,
  });
  
  User.beforeCreate(async (user: UserInstance, options: Object) => {
    //@todo implement bcrypt
    user.dataValues.password = 'hash';
  });

  User.afterDestroy(async(user: UserInstance, options: Object) => {
    sequelize.models.Post.destroy({where: {user_id: user.dataValues.id}}); 
    sequelize.models.UserRole.destroy({where: {user_id: user.dataValues.id}}); 
  });

  return User;
}