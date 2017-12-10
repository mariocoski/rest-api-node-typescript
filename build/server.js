"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('babel-polyfill');
//this will load all env variables for dev and test mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//load http module
var http = require("http");
var app_1 = require("./app");
var _a = require('./models'), sequelize = _a.sequelize, models = _a.models;
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
function dbInit() {
    return __awaiter(this, void 0, void 0, function () {
        var users, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sequelize.sync()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, models.User.findAll({ include: { model: models.Comment, as: 'comments' } })];
                case 3:
                    users = _a.sent();
                    console.log(users[0].comments);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
if (process.env.NODE_ENV !== 'test') {
    dbInit();
}
//listen on the provided port
server.listen(port, function () {
    if (!IS_TEST) {
        console.log("Listening at http://localhost:" + port + "/api/v1");
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