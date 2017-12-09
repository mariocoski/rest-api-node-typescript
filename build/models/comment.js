"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Comment = sequelize.define("comment", {
        postId: {
            type: dataTypes.INTEGER,
            field: 'post_id'
        },
        body: dataTypes.STRING,
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'comments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [],
        paranoid: true,
        underscored: true
    });
    return Comment;
};
//# sourceMappingURL=comment.js.map