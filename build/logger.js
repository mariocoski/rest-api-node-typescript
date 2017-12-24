"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var winston = require("winston");
var config_1 = require("./config");
var getTime = function () { return moment().format('YYYY-MM-DD HH:mm:ss:SSS'); };
winston.cli();
exports.default = new winston.Logger({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level: config_1.default.winston.level,
            prettyPrint: true,
            stderrLevels: ['error'],
            timestamp: getTime,
        }),
        new winston.transports.File({
            level: config_1.default.winston.level,
            filename: config_1.default.winston.winstonDirectory + "/error.log"
        })
    ],
});
//# sourceMappingURL=logger.js.map