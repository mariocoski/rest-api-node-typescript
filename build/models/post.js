"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Post = sequelize.define("Post", {
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
            associate: function (models) {
                Post.belongsTo(models.User, {
                    foreignKey: 'user_id',
                    as: 'posts'
                });
            }
        }
    });
    return Post;
};
//# sourceMappingURL=post.js.map