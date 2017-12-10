"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Comment = sequelize.define("Comment", {
        post_id: dataTypes.INTEGER,
        user_id: dataTypes.INTEGER,
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