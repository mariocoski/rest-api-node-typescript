"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var facade_1 = require("./facade");
var config_1 = require("../config");
exports.default = facade_1.default({
    name: config_1.default.repoFactory.name,
    sequelize: config_1.default.sequelize
});
//# sourceMappingURL=factory.js.map