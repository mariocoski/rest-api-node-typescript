import {Instance} from "sequelize";

export interface UserRoleAttributes {
  id: number,
  user_id: number,
  role_id: number,
  deleted_at: string
}

export interface UserRoleInstance extends Instance<UserRoleAttributes> {
  dataValues: UserRoleAttributes;
}