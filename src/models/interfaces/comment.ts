import {Instance} from "sequelize";

export interface CommentAttributes {
  id: number,
  postId: number,
  body: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface CommentInstance extends Instance<CommentAttributes> {
  dataValues: CommentAttributes;
}