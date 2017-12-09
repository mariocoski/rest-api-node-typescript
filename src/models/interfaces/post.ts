import {Instance} from "sequelize";

export interface PostAttributes {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

export interface PostInstance extends Instance<PostAttributes> {
  dataValues: PostAttributes;
}