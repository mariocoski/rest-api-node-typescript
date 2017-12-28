"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.default = function (response, expectedStatusCode) {
    if (expectedStatusCode === void 0) { expectedStatusCode = constants_1.UNPROCESSABLE_ENTITY_422_HTTP_CODE; }
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body).toMatchSnapshot();
};
//# sourceMappingURL=expectError.js.map