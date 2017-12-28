"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../../config");
var uuid_1 = require("uuid");
function default_1(_a) {
    var data = _a.data;
    return new Promise(function (resolve, reject) {
        jwt.sign({ data: data, jti: uuid_1.v4() }, config_1.default.jwt.secret, { algorithm: config_1.default.jwt.algoritm, expiresIn: config_1.default.jwt.expiresIn }, function (err, token) {
            if (err)
                reject(err);
            resolve("JWT " + token);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=generateToken.js.map