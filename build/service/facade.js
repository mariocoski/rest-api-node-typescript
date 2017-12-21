"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var users_1 = require("./users");
var posts_1 = require("./posts");
var comments_1 = require("./comments");
var roles_1 = require("./roles");
var permissions_1 = require("./permissions");
exports.default = function (config) {
    return {
        login: auth_1.login(config),
        register: auth_1.register(config),
        forgetPassword: auth_1.forgetPassword(config),
        resetPassword: auth_1.resetPassword(config),
        createUser: users_1.createUser(config),
        getUser: users_1.getUser(config),
        getUsers: users_1.getUsers(config),
        updateUser: users_1.updateUser(config),
        deleteUser: users_1.deleteUser(config),
        createPost: posts_1.createPost(config),
        getPost: posts_1.getPost(config),
        getPosts: posts_1.getPosts(config),
        updatePost: posts_1.updatePost(config),
        deletePost: posts_1.deletePost(config),
        createComment: comments_1.createComment(config),
        getComment: comments_1.getComment(config),
        getComments: comments_1.getComments(config),
        updateComment: comments_1.updateComment(config),
        deleteComment: comments_1.deleteComment(config),
        createRole: roles_1.createRole(config),
        getRole: roles_1.getRole(config),
        getRoles: roles_1.getRoles(config),
        updateRole: roles_1.updateRole(config),
        deleteRole: roles_1.deleteRole(config),
        assignUserRole: roles_1.assignUserRole(config),
        removeUserRole: roles_1.removeUserRole(config),
        createPermission: permissions_1.createPermission(config),
        getPermission: permissions_1.getPermission(config),
        getPermissions: permissions_1.getPermissions(config),
        updatePermission: permissions_1.updatePermission(config),
        deletePermission: permissions_1.deletePermission(config),
        assignRolePermission: permissions_1.assignRolePermission(config),
        removeRolePermission: permissions_1.removeRolePermission(config),
    };
};
//# sourceMappingURL=facade.js.map