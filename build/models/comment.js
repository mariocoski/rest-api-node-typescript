"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Comment = sequelize.define("Comment", {
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
            associate: function (models) {
                Comment.belongsTo(models.Post, {
                    foreignKey: 'post_id',
                    as: 'comments'
                });
            }
        }
    });
    return Comment;
};
//# sourceMappingURL=comment.js.map