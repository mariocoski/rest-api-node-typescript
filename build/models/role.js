"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Role = sequelize.define("Role", {
        name: dataTypes.STRING,
        description: dataTypes.STRING,
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'roles',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [],
        paranoid: true,
        underscored: true
    });
    return Role;
};
//# sourceMappingURL=role.js.map