"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var boolean = require("boolean");
exports.default = function (value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = true; }
    return boolean(ramda_1.defaultTo(value, defaultValue));
};
//# sourceMappingURL=getBooleanOption.js.map