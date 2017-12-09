"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var compression = require("compression");
var fs = require("fs");
//we will import the module which will handle routing for our app
//we will populate this file in as sec
var router_1 = require("./router");
//that will create an express app which we will
//exports and pass to http.createServer() function
var app = express();
//body parser parses request bodies. Those could contain like json or url encoded form //data. The form data will then appear in req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//in the meantime (as we don't have any gzip module on nginx yet - we will compress //response bodies for all requests) using compression middleware
app.use(compression());
//we would you morgan for logging requests
//flags: 'a' opens the file in append mode.
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
//doing console.log
app.use(logger('dev'));
//we will use cors middleware for enabling cores and for all requests
//you can read more about cors here:
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);
router_1.default(app);
var myApp = app;
exports.default = myApp;
//# sourceMappingURL=app.js.map