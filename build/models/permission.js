"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Permission = sequelize.define("Permission", {
        userId: dataTypes.INTEGER,
        title: dataTypes.STRING,
        body: dataTypes.STRING,
        createdAt: {
            type: dataTypes.DATE,
            field: 'created_at',
            defaultValue: dataTypes.NOW
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: dataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        tableName: 'permissions',
        indexes: [],
        classMethods: {
            associate: function (models) {
                Permission.belongsToMany(models.Role, {
                    through: 'role_permission',
                    foreignKey: 'permission_id',
                    as: 'permissions'
                });
            }
        }
    });
    return Permission;
};
//# sourceMappingURL=permission.js.map