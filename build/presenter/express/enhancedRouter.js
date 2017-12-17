"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var morgan = require("morgan");
var compression = require("compression");
var cors = require("cors");
var FileStreamRotator = require("file-stream-rotator");
exports.default = function (config) {
    var router = express_1.Router();
    /* CORS */
    var corsMiddleware = cors({
        origin: '*',
        preflightContinue: true
    });
    router.use(corsMiddleware);
    /* BODY PARSER */
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    /* HELMET */
    router.use(helmet());
    /* COMPRESSION */
    router.use(compression());
    /* MORGAN */
    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: config.morganDirectory + "/access-%DATE%.log",
        frequency: 'daily',
        verbose: false,
    });
    router.use(morgan(config.morganLogFormat, { stream: accessLogStream }));
    return router;
};
//# sourceMappingURL=enhancedRouter.js.map