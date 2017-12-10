import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {ResetPasswordTokenAttributes, ResetPasswordTokenInstance} from "./interfaces/reset_password_token";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<ResetPasswordTokenInstance, ResetPasswordTokenAttributes> => {
  const ResetPasswordToken = sequelize.define<ResetPasswordTokenInstance, ResetPasswordTokenAttributes>("ResetPasswordToken", {
    user_id:dataTypes.INTEGER,
    token: dataTypes.STRING,
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'reset_password_tokens',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [],
    paranoid: true,
    underscored: true
  });

  return ResetPasswordToken;
}