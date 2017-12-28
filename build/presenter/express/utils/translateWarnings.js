"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
var validate_1 = require("../../../utils/validate");
exports.default = function (translator, warning) {
    switch (warning.constructor) {
        case validate_1.MinLengthWarning:
            return translator.minLengthWarning(warning);
        case validate_1.MaxLengthWarning:
            return translator.minLengthWarning(warning);
        case rulr_1.TypeWarning:
            return translator.typeWarning(warning);
        case rulr_1.RequiredWarning:
            return translator.requiredWarning(warning);
        case validate_1.InvalidEmailWarning:
            return translator.invalidEmailWarning(warning);
        case validate_1.NotMatchingPasswordWarning:
            return translator.notMatchingPasswordWarning(warning);
        default:
            return translator.warning(warning);
    }
};
//# sourceMappingURL=translateWarnings.js.map