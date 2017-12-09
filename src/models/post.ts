import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {PostAttributes, PostInstance} from "./interfaces/post";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<PostInstance, PostAttributes> => {
  const Post = sequelize.define<PostInstance, PostAttributes>("Post", {
    post_id: dataTypes.INTEGER,
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


  Post.afterDestroy(async(post: PostInstance, options: Object) => {
    sequelize.models.Comment.destroy({where: {post_id: post.dataValues.id}}); 
  });

  return Post;
}