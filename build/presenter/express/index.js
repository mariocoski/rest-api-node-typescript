"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enhancedRouter_1 = require("./enhancedRouter");
var register_1 = require("./auth/register");
exports.default = function (config) {
    var router = enhancedRouter_1.default(config);
    router.get('/', function (req, res) {
        res.status(200)
            .json({ message: "This is where the awesomeness happen..." });
    });
    router.post('/auth/register', register_1.default(config));
    return router;
};
//# sourceMappingURL=index.js.map