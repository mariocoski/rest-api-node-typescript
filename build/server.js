"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('babel-polyfill');
//this will load all env variables for dev and test mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//load http module
var http = require("http");
var app_1 = require("./app");
var iconvLite = require("iconv-lite");
//used for characted encoding conversion
iconvLite.encodingExists('foo');
//signal events are emitted when the Node.js process receives a signal
//SIGINT signal is with -C in most terminal programs
process.on('SIGINT', function () {
    process.exit(0);
});
//this is when testing with jest - its set up
//process.env.NODE_ENV to be test
//in this case we will choose test port accordingly
var IS_TEST = process.env.NODE_ENV === 'test';
//we will replace those port number later on with env vars
var port = IS_TEST ? 3001 : 3000;
//create a server
var server = new http.Server(app_1.default);
//listen on the provided port
server.listen(port, function () {
    if (!IS_TEST) {
        console.log("Listening at http://localhost:" + port);
    }
});
//server error handler
server.on('error', function (error, port) {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            if (process.env.NODE_ENV !== 'test') {
                console.log(port + " requires elevated privileges");
            }
            process.exit(1);
        case 'EADDRINUSE':
            if (process.env.NODE_ENV !== 'test') {
                console.log(port + " is already in use");
            }
            process.exit(1);
        default:
            throw error;
    }
});
exports.default = server;
//# sourceMappingURL=server.js.map