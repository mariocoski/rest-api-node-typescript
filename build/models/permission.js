"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Permission = sequelize.define("permission", {
        roleId: {
            type: dataTypes.INTEGER,
            field: 'role_id'
        },
        title: dataTypes.STRING,
        body: dataTypes.STRING,
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'permissions',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [],
        paranoid: true,
        underscored: true
    });
    return Permission;
};
//# sourceMappingURL=permission.js.map