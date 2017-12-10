"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Permission = sequelize.define("Permission", {
        name: dataTypes.STRING,
        label: dataTypes.STRING,
        description: dataTypes.STRING,
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