"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var facade_1 = require("./utils/sequelize/facade");
exports.default = function (config) {
    /* istanbul ignore next */
    switch (config.name) {
        default:
        case 'sequelize':
            return facade_1.default(config.sequelize);
    }
};
//# sourceMappingURL=facade.js.map