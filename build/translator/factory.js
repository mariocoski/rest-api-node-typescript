"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_1 = require("./languages");
var config_1 = require("../config");
exports.default = function () {
    switch (config_1.default.lang) {
        case 'en':
        default:
            return languages_1.en;
    }
};
//# sourceMappingURL=factory.js.map