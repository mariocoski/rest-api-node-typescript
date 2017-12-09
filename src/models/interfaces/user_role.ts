import {Instance} from "sequelize";

export interface UserRoleAttributes {
  id: number,
  userId: number,
  roleId: number,
  deletedAt: string
}

export interface UserRoleInstance extends Instance<UserRoleAttributes> {
  dataValues: UserRoleAttributes;
}