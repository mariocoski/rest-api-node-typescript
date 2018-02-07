import {Instance} from "sequelize";

export interface PostAttributes {
  id?: string,
  user_id?: string,
  title?: string,
  body?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string
}

export interface PostInstance extends Instance<PostAttributes> {
  dataValues: PostAttributes;
}