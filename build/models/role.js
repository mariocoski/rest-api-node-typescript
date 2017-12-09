"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var Role = sequelize.define("Role", {
        userId: dataTypes.INTEGER,
        name: dataTypes.STRING,
        description: dataTypes.STRING,
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
        tableName: 'roles',
        indexes: [],
        classMethods: {
            associate: function (models) {
                Role.belongsToMany(models.User, {
                    through: 'user_role',
                    foreignKey: 'role_id',
                    as: 'users'
                });
            }
        }
    });
    return Role;
};
//# sourceMappingURL=role.js.map