import {Instance} from "sequelize";

export interface ResetPasswordTokenAttributes {
  id: number,
  userId: number,
  token: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface ResetPasswordTokenInstance extends Instance<ResetPasswordTokenAttributes> {
  dataValues: ResetPasswordTokenAttributes;
}