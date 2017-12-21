"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("../../users/createUser/sequelize");
var sequelize_2 = require("../../users/updateUser/sequelize");
var sequelize_3 = require("../../users/deleteUser/sequelize");
var sequelize_4 = require("../../users/getUser/sequelize");
var sequelize_5 = require("../../users/getUsers/sequelize");
exports.default = function (config) {
    return {
        createUser: sequelize_1.default(config),
        updateUser: sequelize_2.default(config),
        deleteUser: sequelize_3.default(config),
        getUser: sequelize_4.default(config),
        getUsers: sequelize_5.default(config)
    };
};
//# sourceMappingURL=facade.js.map