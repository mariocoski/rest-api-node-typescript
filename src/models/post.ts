import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {PostAttributes, PostInstance} from "./interfaces/post";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<PostInstance, PostAttributes> => {
  const Post = sequelize.define<PostInstance, PostAttributes>("Post", {
    userId: dataTypes.INTEGER,
    title: dataTypes.STRING,
    body: dataTypes.STRING,
    createdAt: {
      type: dataTypes.DATE,
      field: 'created_at',
      defaultValue: dataTypes.NOW 
    },
    updatedAt: {
      type: dataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: dataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    tableName: 'posts',
    indexes: [],
    classMethods: {
      associate(models: SequelizeModels){
        Post.belongsTo(models.User,{
          foreignKey: 'user_id',
          as: 'posts'
        });
      }
    }
  });

  return Post;
}