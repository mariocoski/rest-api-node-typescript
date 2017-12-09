"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var RolePermission = sequelize.define("RolePermission", {
        roleId: {
            type: dataTypes.INTEGER,
            field: 'role_id'
        },
        permissionId: {
            type: dataTypes.INTEGER,
            field: 'permission_id'
        },
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'role_permission',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        underscored: true
    });
    return RolePermission;
};
//# sourceMappingURL=role_permission.js.map