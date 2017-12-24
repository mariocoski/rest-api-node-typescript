"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("../repo/factory");
var facade_1 = require("./facade");
var logger_1 = require("../logger");
var repo = factory_1.default();
exports.default = function () { return facade_1.default({
    repo: repo,
    logger: logger_1.default
}); };
//# sourceMappingURL=factory.js.map