import {Instance} from "sequelize";

export interface CommentAttributes {
  id?: string,
  post_id?: string,
  user_id?: string,
  body?: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string
}

export interface CommentInstance extends Instance<CommentAttributes> {
  dataValues: CommentAttributes;
}