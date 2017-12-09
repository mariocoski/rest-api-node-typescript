"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Post = sequelize.define("post", {
        userId: {
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
};
//# sourceMappingURL=post.js.map