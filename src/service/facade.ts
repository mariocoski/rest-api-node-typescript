import Config from './Config';
import Service from './Service';
import {login, register, forgetPassword, resetPassword} from './auth';
import {createUser, getUser, getUsers, updateUser, deleteUser} from './users';
import {createPost, getPost, getPosts, updatePost, deletePost} from './posts';
import {createComment, getComment, getComments, updateComment, deleteComment} from './comments';
import {createRole, getRole, getRoles, updateRole, deleteRole, assignUserRole, removeUserRole} from './roles';
import {createPermission, getPermission, getPermissions, updatePermission, deletePermission, assignRolePermission, removeRolePermission} from './permissions';

export default (config: Config): Service => {
  return {
    login: login(config),
    register: register(config),
    forgetPassword: forgetPassword(config),
    resetPassword: resetPassword(config),

    createUser: createUser(config),
    getUser: getUser(config),
    getUsers: getUsers(config),
    updateUser: updateUser(config),
    deleteUser: deleteUser(config),

    createPost: createPost(config),
    getPost: getPost(config),
    getPosts: getPosts(config),
    updatePost: updatePost(config),
    deletePost: deletePost(config),

    createComment: createComment(config),
    getComment: getComment(config),
    getComments: getComments(config),
    updateComment: updateComment(config),
    deleteComment: deleteComment(config),

    createRole: createRole(config),
    getRole: getRole(config),
    getRoles: getRoles(config),
    updateRole: updateRole(config),
    deleteRole: deleteRole(config),
    assignUserRole: assignUserRole(config),
    removeUserRole: removeUserRole(config),

    createPermission: createPermission(config),
    getPermission: getPermission(config),
    getPermissions: getPermissions(config),
    updatePermission: updatePermission(config),
    deletePermission: deletePermission(config),
    assignRolePermission: assignRolePermission(config),
    removeRolePermission: removeRolePermission(config),
  };
};