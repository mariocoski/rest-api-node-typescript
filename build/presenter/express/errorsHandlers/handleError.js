"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var config = _a.config, errorId = _a.errorId, res = _a.res, err = _a.err;
    var logger = config.logger;
    var logError = function (msg, meta) {
        logger.error(errorId + ": error handled - " + msg, meta);
    };
    return res;
};
//# sourceMappingURL=handleError.js.map