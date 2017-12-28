"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
var InvalidEmailWarning = /** @class */ (function (_super) {
    __extends(InvalidEmailWarning, _super);
    function InvalidEmailWarning(data, path) {
        return _super.call(this, data, path) || this;
    }
    return InvalidEmailWarning;
}(rulr_1.Warning));
exports.InvalidEmailWarning = InvalidEmailWarning;
var MinLengthWarning = /** @class */ (function (_super) {
    __extends(MinLengthWarning, _super);
    function MinLengthWarning(data, path, length) {
        var _this = _super.call(this, data, path) || this;
        _this.length = length;
        return _this;
    }
    return MinLengthWarning;
}(rulr_1.Warning));
exports.MinLengthWarning = MinLengthWarning;
var MaxLengthWarning = /** @class */ (function (_super) {
    __extends(MaxLengthWarning, _super);
    function MaxLengthWarning(data, path, length) {
        var _this = _super.call(this, data, path) || this;
        _this.length = length;
        return _this;
    }
    return MaxLengthWarning;
}(rulr_1.Warning));
exports.MaxLengthWarning = MaxLengthWarning;
var NotMatchingPasswordWarning = /** @class */ (function (_super) {
    __extends(NotMatchingPasswordWarning, _super);
    function NotMatchingPasswordWarning(data, path) {
        return _super.call(this, data, path) || this;
    }
    return NotMatchingPasswordWarning;
}(rulr_1.Warning));
exports.NotMatchingPasswordWarning = NotMatchingPasswordWarning;
exports.createMinLengthWarning = function (data, path, length) {
    return new MinLengthWarning(data, path, length);
};
exports.createMaxLengthWarning = function (data, path, length) {
    return new MaxLengthWarning(data, path, length);
};
exports.createNotMatchingPasswordWarning = function (data, path) {
    return new NotMatchingPasswordWarning(data.password, path);
};
exports.createInvalidEmailWarning = function (data, path) {
    return new InvalidEmailWarning(data.password, path);
};
exports.validateMatchingPasswords = function (data, path) {
    return (data.password && data.password_confirmation && data.password === data.password_confirmation) ? [] : [exports.createNotMatchingPasswordWarning(data, path)];
};
exports.minLength = function (length, rule) { return function (data, path) {
    return data.length >= length ? (rule ? rule(data, path) : []) : [exports.createMinLengthWarning(data, path, length)];
}; };
exports.maxLength = function (length, rule) { return function (data, path) {
    return data.length <= length ? (rule ? rule(data, path) : []) : [exports.createMaxLengthWarning(data, path, length)];
}; };
exports.isEmail = rulr_1.checkRegex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, exports.createInvalidEmailWarning);
//# sourceMappingURL=index.js.map