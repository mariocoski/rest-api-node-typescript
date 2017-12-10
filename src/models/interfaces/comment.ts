import {Instance} from "sequelize";

export interface CommentAttributes {
  id: number,
  post_id: number,
  user_id: number,
  body: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}

export interface CommentInstance extends Instance<CommentAttributes> {
  dataValues: CommentAttributes;
}