"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var UserRole = sequelize.define("UserRole", {
        user_id: dataTypes.INTEGER,
        role_id: dataTypes.INTEGER,
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'user_role',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        underscored: true
    });
    return UserRole;
};
//# sourceMappingURL=user_role.js.map