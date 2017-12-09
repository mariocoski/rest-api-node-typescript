"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var RolePermission = sequelize.define("RolePermission", {
        roleId: dataTypes.INTEGER,
        permissionId: dataTypes.INTEGER,
        deletedAt: {
            type: dataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        tableName: 'role_permission',
    });
    return RolePermission;
};
//# sourceMappingURL=role_permission.js.map