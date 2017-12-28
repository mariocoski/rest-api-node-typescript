"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var users_1 = require("./users");
var permissions_1 = require("./permissions");
var utils_1 = require("./utils");
exports.default = function (config) {
    return {
        // login: login(config),
        register: auth_1.register(config),
        // forgetPassword: forgetPassword(config),
        // resetPassword: resetPassword(config),
        createUser: users_1.createUser(config),
        getUser: users_1.getUser(config),
        // getUsers: getUsers(config),
        // updateUser: updateUser(config),
        // deleteUser: deleteUser(config),
        // createPost: createPost(config),
        // getPost: getPost(config),
        // getPosts: getPosts(config),
        // updatePost: updatePost(config),
        // deletePost: deletePost(config),
        // createComment: createComment(config),
        // getComment: getComment(config),
        // getComments: getComments(config),
        // updateComment: updateComment(config),
        // deleteComment: deleteComment(config),
        // createRole: createRole(config),
        // getRole: getRole(config),
        // getRoles: getRoles(config),
        // updateRole: updateRole(config),
        // deleteRole: deleteRole(config),
        // assignUserRole: assignUserRole(config),
        // removeUserRole: removeUserRole(config),
        // createPermission: createPermission(config),
        // getPermission: getPermission(config),
        // getPermissions: getPermissions(config),
        // updatePermission: updatePermission(config),
        // deletePermission: deletePermission(config),
        // assignRolePermission: assignRolePermission(config),
        // removeRolePermission: removeRolePermission(config),
        getUserPermissions: permissions_1.getUserPermissions(config),
        clearService: utils_1.clearService(config),
        migrate: utils_1.migrate(config),
        rollback: utils_1.rollback(config),
    };
};
//# sourceMappingURL=facade.js.map