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
var ModelNotFoundError_1 = require("../../../utils/errors/ModelNotFoundError");
var constants_1 = require("../../../utils/constants");
exports.default = function (config) {
    return function (_a) {
        var userId = _a.userId, _b = _a.role, role = _b === void 0 ? constants_1.DEFAULT_USER_ROLE : _b, _c = _a.permissions, permissions = _c === void 0 ? constants_1.DEFAULT_USER_PERMISSIONS : _c;
        return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var user, userRole, createdPermissions;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, config.models.User.findById(userId)];
                    case 1:
                        user = _d.sent();
                        if (user === null)
                            throw new ModelNotFoundError_1.default();
                        return [4 /*yield*/, config.models.Role.create(role)];
                    case 2:
                        userRole = _d.sent();
                        return [4 /*yield*/, user.setRoles([userRole])];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, Promise.all(permissions.map(function (permission) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, config.models.Permission.create(permission)];
                            }); }); }))];
                    case 4:
                        createdPermissions = _d.sent();
                        return [4 /*yield*/, userRole.setPermissions(createdPermissions)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
};
//# sourceMappingURL=sequelize.js.map