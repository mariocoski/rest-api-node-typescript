"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import register from '../../auth/register/sequelize';
var sequelize_1 = require("../../users/createUser/sequelize");
// import updateUser from '../../users/updateUser/sequelize';
// import deleteUser from '../../users/deleteUser/sequelize';
var sequelize_2 = require("../../users/getUser/sequelize");
var sequelize_3 = require("../../permissions/getUserPermissions/sequelize");
var sequelize_4 = require("../../permissions/createUserPermissions/sequelize");
// import getUsers from '../../users/getUsers/sequelize';
var sequelize_5 = require("../../commons/migrate/sequelize");
var sequelize_6 = require("../../commons/rollback/sequelize");
var sequelize_7 = require("../../commons/clearRepo/sequelize");
exports.default = function (config) {
    return {
        createUser: sequelize_1.default(config),
        getUser: sequelize_2.default(config),
        createUserPermissions: sequelize_4.default(config),
        getUserPermissions: sequelize_3.default(config),
        clearRepo: sequelize_7.default(config),
        migrate: sequelize_5.default(config),
        rollback: sequelize_6.default(config)
    };
};
//# sourceMappingURL=facade.js.map