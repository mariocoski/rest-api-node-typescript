"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../../utils/errors");
var rulr_1 = require("rulr");
var translateWarnings_1 = require("./translateWarnings");
var constants_1 = require("./constants");
exports.default = function (_a) {
    var config = _a.config, errorId = _a.errorId, res = _a.res, err = _a.err;
    var logger = config.logger, translator = config.translator;
    var logError = function (msg, meta) {
        logger.error(errorId + ": error handled - " + msg, meta);
    };
    if (err instanceof rulr_1.Warnings) {
        var warnings = err.warnings;
        var errors = warnings.map(function (warning) {
            return translateWarnings_1.default(translator, warning);
        });
        var message = constants_1.UNPROCESSABLE_ENTITY_MESSAGE;
        logError(message);
        return res.status(constants_1.UNPROCESSABLE_ENTITY_422_HTTP_CODE).json({ errors: errors, message: message });
    }
    if (err instanceof errors_1.UserAlreadyExistsError) {
        var message = translator.userAlreadyExists();
        logError(message);
        return res.status(constants_1.CONFLICT_409_HTTP_CODE).json({ message: message });
    }
    if (err instanceof errors_1.UnauthorizedError) {
        var message = translator.unauthorized();
        logError(message);
        return res.status(constants_1.UNAUTHORISED_401_HTTP_CODE).json({ message: message });
    }
    if (err instanceof errors_1.ForbiddenError) {
        var message = translator.forbidden();
        logError(message);
        return res.status(constants_1.FORBIDDEN_403_HTTP_CODE).json({ message: message });
    }
    {
        var message = translator.serverError();
        logError(message);
        return res.status(constants_1.SERVER_ERROR_500_HTTP_CODE).json({ message: message });
    }
};
//# sourceMappingURL=handleError.js.map