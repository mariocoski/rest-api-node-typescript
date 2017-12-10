"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Post = sequelize.define("Post", {
        user_id: dataTypes.INTEGER,
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
    Post.afterDestroy(function (post, options) {
        sequelize.models.Comment.destroy({ where: { post_id: post.dataValues.id }, individualHooks: true });
    });
    return Post;
};
//# sourceMappingURL=post.js.map