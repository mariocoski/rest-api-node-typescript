import Config from './Config';
import Service from './Service';
import {login, register, forgetPassword, resetPassword} from './auth';
import {createUser, getUserById, getUserByEmail, getUsers, updateUser, deleteUserById} from './users';
import {createPost, getPostById, getPosts, updatePost, deletePostById} from './posts';
import {createComment, getCommentById, getComments, updateComment, deleteCommentById} from './comments';
import {createRole, getRoleById, getRoles, updateRole, deleteRoleById, revokeRolePermission, assignRolePermission} from './roles';
import {getUserPermissions, createUserPermissions, createPermission, getPermissionById, getPermissions, updatePermission, deletePermissionById, removeRolePermission} from './permissions';
import {migrate, rollback, clearService} from './utils';
import {getUserResetPasswordTokens,createResetPasswordToken, getResetPasswordTokenByToken} from './resetPasswordTokens';

export default (config: Config): Service => {
  return {
    login: login(config),
    register: register(config),
    forgetPassword: forgetPassword(config),
    resetPassword: resetPassword(config),
    getResetPasswordTokenByToken: getResetPasswordTokenByToken(config),
    createResetPasswordToken: createResetPasswordToken(config),
    getUserResetPasswordTokens: getUserResetPasswordTokens(config),
    createUser: createUser(config),
    getUserById: getUserById(config),
    getUserByEmail: getUserByEmail(config),
    getUsers: getUsers(config),
    updateUser: updateUser(config),
    deleteUserById: deleteUserById(config),

    createPost: createPost(config),
    getPostById: getPostById(config),
    getPosts: getPosts(config),
    updatePost: updatePost(config),
    deletePostById: deletePostById(config),
    assignRolePermission: assignRolePermission(config),
    revokeRolePermission: revokeRolePermission(config),

    createComment: createComment(config),
    getCommentById: getCommentById(config),
    getComments: getComments(config),
    updateComment: updateComment(config),
    deleteCommentById: deleteCommentById(config),

    createRole: createRole(config),
    getRoleById: getRoleById(config),
    getRoles: getRoles(config),
    updateRole: updateRole(config),
    deleteRoleById: deleteRoleById(config),
    // assignUserRole: assignUserRole(config),
    // removeUserRole: removeUserRole(config),

    createPermission: createPermission(config),
    getPermissionById: getPermissionById(config),
    getPermissions: getPermissions(config),
    updatePermission: updatePermission(config),
    deletePermissionById: deletePermissionById(config),
    // removeRolePermission: removeRolePermission(config),
    getUserPermissions: getUserPermissions(config),
    createUserPermissions: createUserPermissions(config),
  
    clearService: clearService(config),
    migrate: migrate(config),
    rollback: rollback(config),
  };
};