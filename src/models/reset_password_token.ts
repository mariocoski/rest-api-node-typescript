import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {ResetPasswordTokenAttributes, ResetPasswordTokenInstance} from "./interfaces/reset_password_token";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<ResetPasswordTokenInstance, ResetPasswordTokenAttributes> => {
  const ResetPasswordToken = sequelize.define<ResetPasswordTokenInstance, ResetPasswordTokenAttributes>("ResetPasswordToken", {
    userId: dataTypes.INTEGER,
    token: dataTypes.STRING,
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
    tableName: 'reset_password_tokens',
    indexes: [],
    classMethods: {
      associate(models: SequelizeModels){
        ResetPasswordToken.belongsTo(models.User,{
          foreignKey: 'user_id',
          as: 'tokens'
        });
      }
    }
  });

  return ResetPasswordToken;
}