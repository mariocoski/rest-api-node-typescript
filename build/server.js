"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
var iconvLite = require("iconv-lite");
iconvLite.encodingExists('foo');
var express = require("express");
var config_1 = require("./config");
var logger_1 = require("./logger");
var express_1 = require("./presenter/express");
var factory_1 = require("./service/factory");
var factory_2 = require("./translator/factory");
var constants_1 = require("./utils/constants");
var app = express();
var service = factory_1.default();
var translator = factory_2.default();
var presenterFacade = express_1.default({
    morganLogFormat: config_1.default.express.morganLogFormat,
    morganDirectory: config_1.default.express.morganDirectory,
    service: service,
    logger: logger_1.default,
    translator: translator
});
var handleExit = function (event) {
    return function (error) {
        if (error !== undefined) {
            logger_1.default.error(error.stack);
        }
        logger_1.default.info(event);
        process.exit();
    };
};
app.use(constants_1.API_ROUTE_V1, presenterFacade);
app.listen(config_1.default.express.port, function () {
    logger_1.default.info("Listening on port " + config_1.default.express.port);
    if (process.send !== undefined) {
        logger_1.default.info('Process ready');
        process.send('ready');
    }
    process.on('exit', handleExit('exit'));
    process.on('SIGINT', handleExit('SIGINT'));
    process.on('SIGTERM', handleExit('SIGTERM'));
    process.on('uncaughtException', handleExit('uncaughtException'));
});
//# sourceMappingURL=server.js.map