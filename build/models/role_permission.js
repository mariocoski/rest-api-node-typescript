"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var RolePermission = sequelize.define("RolePermission", {
        role_id: dataTypes.INTEGER,
        permission_id: dataTypes.INTEGER,
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