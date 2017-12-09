"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sequelize, dataTypes) {
    var ResetPasswordToken = sequelize.define("resetpasswordtoken", {
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
        },
        token: dataTypes.STRING,
        deleted_at: dataTypes.DATE
    }, {
        tableName: 'reset_password_tokens',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [],
        paranoid: true,
        underscored: true
    });
    return ResetPasswordToken;
};
//# sourceMappingURL=reset_password_token.js.map