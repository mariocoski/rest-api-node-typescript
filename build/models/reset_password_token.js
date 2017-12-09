"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var ResetPasswordToken = sequelize.define("ResetPasswordToken", {
        userId: dataTypes.INTEGER,
        token: dataTypes.STRING,
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
        tableName: 'reset_password_tokens',
        indexes: [],
        classMethods: {
            associate: function (models) {
                ResetPasswordToken.belongsTo(models.User, {
                    foreignKey: 'user_id',
                    as: 'tokens'
                });
            }
        }
    });
    return ResetPasswordToken;
};
//# sourceMappingURL=reset_password_token.js.map