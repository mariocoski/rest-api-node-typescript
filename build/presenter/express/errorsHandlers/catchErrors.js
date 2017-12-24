"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleError_1 = require("./handleError");
var uuid_1 = require("uuid");
exports.default = function (config, handler) {
    return function (req, res) {
        try {
            return handler(req, res);
        }
        catch (err) {
            var errorId = uuid_1.v4();
            config.logger.silly(errorId + ": api request", {
                headers: req.headers,
                method: req.method
            });
            return handleError_1.default({ config: config, errorId: errorId, res: res, err: err });
        }
    };
};
//# sourceMappingURL=catchErrors.js.map