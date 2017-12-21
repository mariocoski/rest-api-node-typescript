"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("../repo/factory");
var facade_1 = require("./facade");
var logger_1 = require("../logger");
exports.default = facade_1.default({
    repo: factory_1.default,
    logger: logger_1.default
});
//# sourceMappingURL=factory.js.map