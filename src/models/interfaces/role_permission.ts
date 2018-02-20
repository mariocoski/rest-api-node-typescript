import {Instance} from "sequelize";

export interface RolePermissionAttributes {
  id?: number,
  role_id?: string,
  permission_id?: string,
  deleted_at?: string
}

export interface RolePermissionInstance extends Instance<RolePermissionAttributes> {
  dataValues: RolePermissionAttributes;
}