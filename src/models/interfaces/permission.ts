import {Instance} from "sequelize";

export interface PermissionAttributes {
  id?: number,
  name?: string,
  label?: string,
  description?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string
}

export interface PermissionInstance extends Instance<PermissionAttributes> {
  dataValues: PermissionAttributes;
}