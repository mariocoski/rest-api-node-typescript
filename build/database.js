"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
module.exports = {
    development: config_1.default.sequelize.development,
    test: config_1.default.sequelize.test,
    production: config_1.default.sequelize.production
};
//# sourceMappingURL=database.js.map