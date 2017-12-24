"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseError = /** @class */ (function () {
    function BaseError(message) {
        if (message === void 0) { message = 'Error'; }
        this.message = message;
        this.name = this.constructor.name;
        this.stack = (new Error(this.message)).stack;
    }
    return BaseError;
}());
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map