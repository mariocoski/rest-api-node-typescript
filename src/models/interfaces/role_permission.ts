import {Instance} from "sequelize";

export interface RolePermissionAttributes {
  id?: number,
  role_id?: number,
  permission_id?: number,
  deleted_at?: string
}

export interface RolePermissionInstance extends Instance<RolePermissionAttributes> {
  dataValues: RolePermissionAttributes;
}