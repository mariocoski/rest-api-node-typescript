import {Instance} from "sequelize";

export interface PermissionAttributes {
  id: number,
  roleId: number,
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface PermissionInstance extends Instance<PermissionAttributes> {
  dataValues: PermissionAttributes;
}