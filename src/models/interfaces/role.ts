import {Instance} from "sequelize";
import {PermissionInstance} from './permission';
export interface RoleAttributes {
  id?: string,
  name?: string,
  description?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string
}

export interface RoleInstance extends Instance<RoleAttributes> {
  dataValues: RoleAttributes;
  permissions: PermissionInstance[];
}