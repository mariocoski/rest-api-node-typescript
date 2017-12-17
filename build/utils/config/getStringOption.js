"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.default = function (value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    return ramda_1.defaultTo(value, defaultValue);
};
//# sourceMappingURL=getStringOption.js.map