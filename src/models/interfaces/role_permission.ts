import {Instance} from "sequelize";

export interface RolePermissionAttributes {
  id: number,
  roleId: number,
  permissionId: number,
  deletedAt: string
}

export interface RolePermissionInstance extends Instance<RolePermissionAttributes> {
  dataValues: RolePermissionAttributes;
}