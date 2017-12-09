"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = function (app) {
    //init your main express router
    var apiRouter = express_1.Router();
    //handle GET request to /api/v1
    apiRouter.get('/', function (req, res) {
        res.status(200).json({ message: "This is where the awesomeness happen..." });
    });
    app.use('/api/v1', apiRouter);
};
exports.default = router;
//# sourceMappingURL=router.js.map