import {Instance} from "sequelize";
import {RoleInstance} from './role';
import {SequelizeModels} from '../index';
export interface UserAttributes {
  id: number,
  firstname: string,
  lastname: string,
  bio: string,
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}


export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes;
}