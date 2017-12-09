import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {CommentAttributes, CommentInstance} from "./interfaces/comment";
import {SequelizeModels} from './index';

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<CommentInstance, CommentAttributes> => {
  const Comment = sequelize.define<CommentInstance, CommentAttributes>("Comment", {
    postId: dataTypes.INTEGER,
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
    tableName: 'comments',
    indexes: [],
    classMethods: {
      associate(models: SequelizeModels){
        Comment.belongsTo(models.Post,{
          foreignKey: 'post_id',
          as: 'comments'
        });
      }
    }
  });

  return Comment;
}