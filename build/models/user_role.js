"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var UserRole = sequelize.define("UserRole", {
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
        },
        roleId: {
            type: dataTypes.INTEGER,
            field: 'role_id'
        },
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