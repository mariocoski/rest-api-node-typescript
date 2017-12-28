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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var initTests_1 = require("../../utils/initTests");
var constants_1 = require("../../../../utils/constants");
var constants_2 = require("../../utils/constants");
var testValues_1 = require("../../../../utils/testValues");
var R = require("ramda");
var expectError_1 = require("../../utils/expectError");
describe(__filename, function () {
    var _a = initTests_1.default(), service = _a.service, request = _a.request;
    it('should fail to create a user without input', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")];
                case 1:
                    response = _a.sent();
                    expectError_1.default(response);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a user when email is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                        .send({
                        email: testValues_1.TEST_INVALID_EMAIL,
                        password: testValues_1.TEST_VALID_PASSWORD,
                        password_confirmation: testValues_1.TEST_VALID_PASSWORD
                    })];
                case 1:
                    response = _a.sent();
                    expectError_1.default(response);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a user without password', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                        .send({ email: testValues_1.TEST_VALID_EMAIL })];
                case 1:
                    response = _a.sent();
                    expectError_1.default(response);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a user with too short password', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                        .send({
                        email: testValues_1.TEST_VALID_EMAIL,
                        password: testValues_1.TEST_TOO_SHORT_PASSWORD
                    })];
                case 1:
                    response = _a.sent();
                    expectError_1.default(response);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a user with the same email address', function () { return __awaiter(_this, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.register(testValues_1.TEST_VALID_USER)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                            .send(testValues_1.TEST_VALID_USER)];
                case 2:
                    response = _a.sent();
                    expectError_1.default(response, constants_2.CONFLICT_409_HTTP_CODE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a user when the password does not match password_confirmation', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                        .send({
                        email: testValues_1.TEST_VALID_EMAIL,
                        password: testValues_1.TEST_VALID_EMAIL,
                        password_confirmation: testValues_1.TEST_DIFFERENT_VALID_PASSWORD
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(constants_2.UNPROCESSABLE_ENTITY_422_HTTP_CODE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should succesfully register a user', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, _a, user, token, permissions, permissionsNames, defaultPermissionsNames;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.post(constants_1.API_ROUTE_V1 + "/auth/register")
                        .send(testValues_1.TEST_VALID_USER)];
                case 1:
                    response = _b.sent();
                    _a = response.body, user = _a.user, token = _a.token;
                    return [4 /*yield*/, service.getUserPermissions({ userId: user.id })];
                case 2:
                    permissions = _b.sent();
                    permissionsNames = R.pluck('name')(permissions);
                    defaultPermissionsNames = R.pluck('name')(constants_1.DEFAULT_USER_PERMISSIONS);
                    expect(R.intersection(permissionsNames, defaultPermissionsNames).length)
                        .toBe(constants_1.DEFAULT_USER_PERMISSIONS.length);
                    expect(response.status).toBe(constants_2.CREATED_201_HTTP_CODE);
                    expect(token).toMatch(/JWT/);
                    expect(user.email).toEqual(testValues_1.TEST_VALID_USER.email);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=register.test.js.map