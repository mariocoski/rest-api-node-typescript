import {Instance} from "sequelize";

export interface PostAttributes {
  id: number,
  user_id: number,
  title: string,
  body: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}

export interface PostInstance extends Instance<PostAttributes> {
  dataValues: PostAttributes;
}