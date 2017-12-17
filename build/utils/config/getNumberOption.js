"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.default = function (value, defaultValue) {
    return ramda_1.defaultTo(Number(value), defaultValue);
};
//# sourceMappingURL=getNumberOption.js.map