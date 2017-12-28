"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringPath_1 = require("../utils/stringPath");
var translator = {
    unauthorized: function () { return 'Unauthorized'; },
    forbidden: function () { return 'Forbidden'; },
    serverError: function () { return 'Server error'; },
    userAlreadyExists: function () { return 'User already exists'; },
    invalidEmailWarning: function (warning) {
        var path = stringPath_1.default(warning.path);
        var dataString = JSON.stringify(warning.data);
        return "Invalid email in '" + path + "'. Received '" + dataString + "'";
    },
    requiredWarning: function (warning) {
        var path = stringPath_1.default(warning.path);
        return "Missing required value in '" + path + "'";
    },
    typeWarning: function (warning) {
        var path = stringPath_1.default(warning.path);
        var typeName = warning.type.name;
        var dataString = JSON.stringify(warning.data);
        return "Expected '" + path + "' to be '" + typeName + "'. Received '" + dataString + "'";
    },
    minLengthWarning: function (warning) {
        var pathString = stringPath_1.default(warning.path);
        var dataString = JSON.stringify(warning.data);
        return "Required data in " + pathString + " must have at least " + warning.length + " characters.";
    },
    maxLengthWarning: function (warning) {
        var pathString = stringPath_1.default(warning.path);
        var dataString = JSON.stringify(warning.data);
        return "Required data in " + pathString + " must have maximum " + warning.length + " characters.";
    },
    notMatchingPasswordWarning: function (warning) {
        var pathString = stringPath_1.default(warning.path);
        var dataString = JSON.stringify(warning.data);
        return "Passwords must match in " + pathString;
    },
    warning: function (warning) {
        var path = stringPath_1.default(warning.path);
        var dataString = JSON.stringify(warning.data);
        return "Problem in '" + path + "'. Received '" + dataString + "'";
    },
};
exports.default = translator;
//# sourceMappingURL=en.js.map