"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var facade_1 = require("./utils/sequelize/facade");
var models_1 = require("../models");
exports.default = function (config) {
    /* istanbul ignore next */
    switch (config.name) {
        default:
        case 'sequelize':
            return facade_1.default({
                sequelizeInstance: models_1.sequelize,
                models: models_1.models
            });
    }
};
//# sourceMappingURL=facade.js.map