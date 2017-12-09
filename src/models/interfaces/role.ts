import {Instance} from "sequelize";

export interface RoleAttributes {
  id: number,
  userId: number,
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface RoleInstance extends Instance<RoleAttributes> {
  dataValues: RoleAttributes;
}