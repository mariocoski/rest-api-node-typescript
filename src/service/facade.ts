import Config from './Config';
import Service from './Service';
import {login, register, forgetPassword, resetPassword} from './auth';
import {createUser, getUserById, getUserByEmail, getUsers, updateUser, deleteUserById} from './users';
import {createPost, getPost, getPosts, updatePost, deletePost} from './posts';
import {createComment, getComment, getComments, updateComment, deleteComment} from './comments';
import {createRole, getRole, getRoles, updateRole, deleteRole, assignUserRole, removeUserRole} from './roles';
import {getUserPermissions, createUserPermissions, createPermission, getPermission, getPermissions, updatePermission, deletePermission, assignRolePermission, removeRolePermission} from './permissions';
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
    // getPost: getPost(config),
    getPosts: getPosts(config),
    // updatePost: updatePost(config),
    // deletePost: deletePost(config),

    // createComment: createComment(config),
    // getComment: getComment(config),
    // getComments: getComments(config),
    // updateComment: updateComment(config),
    // deleteComment: deleteComment(config),

    createRole: createRole(config),
    // getRole: getRole(config),
    // getRoles: getRoles(config),
    // updateRole: updateRole(config),
    // deleteRole: deleteRole(config),
    // assignUserRole: assignUserRole(config),
    // removeUserRole: removeUserRole(config),

    createPermission: createPermission(config),
    // getPermission: getPermission(config),
    // getPermissions: getPermissions(config),
    // updatePermission: updatePermission(config),
    // deletePermission: deletePermission(config),
    // assignRolePermission: assignRolePermission(config),
    // removeRolePermission: removeRolePermission(config),
    getUserPermissions: getUserPermissions(config),
    createUserPermissions: createUserPermissions(config),
  
    clearService: clearService(config),
    migrate: migrate(config),
    rollback: rollback(config),
  };
};