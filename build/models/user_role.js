"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var UserRole = sequelize.define("UserRole", {
        userId: dataTypes.INTEGER,
        roleId: dataTypes.INTEGER,
        deletedAt: {
            type: dataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        tableName: 'user_role',
    });
    return UserRole;
};
//# sourceMappingURL=user_role.js.map