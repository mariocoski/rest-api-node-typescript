import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {PostAttributes, PostInstance} from "./interfaces/post";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<PostInstance, PostAttributes> => {
  const Post = sequelize.define<PostInstance, PostAttributes>("post", {
    userId:{
      type: dataTypes.INTEGER,
      field: 'user_id'
    },
    title: dataTypes.STRING,
    body: dataTypes.STRING,
    deleted_at: dataTypes.DATE
  }, {
    tableName: 'posts',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [],
    paranoid: true,
    underscored: true
  });

  return Post;
}