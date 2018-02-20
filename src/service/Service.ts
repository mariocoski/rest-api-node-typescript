
import {loginSignature, registerSignature, forgetPasswordSignature, resetPasswordSignature} from './auth';
import {createUserSignature, getUserByIdSignature,getUserByEmailSignature, getUsersSignature, updateUserSignature, deleteUserByIdSignature} from './users';
import {createPostSignature, getPostByIdSignature, getPostsSignature, updatePostSignature, deletePostByIdSignature } from './posts';
import {createCommentSignature, getCommentByIdSignature, getCommentsSignature, updateCommentSignature, deleteCommentByIdSignature } from './comments';
import {createRoleSignature, getRoleByIdSignature, getRolesSignature, updateRoleSignature, deleteRoleByIdSignature, revokeRolePermissionSignature } from './roles';
import {getUserPermissionsSignature, createPermissionSignature, getPermissionSignature, getPermissionsSignature, updatePermissionSignature, deletePermissionSignature, assignRolePermissionSignature, removeRolePermissionSignature, CreateUserPermissionsSignature } from './permissions';
import CommonServiceSignature from './utils/CommonServiceSignature';
import {GetUserResetPasswordTokensSignature,CreateResetPasswordTokenSignature,GetResetPasswordTokenByTokenSignature} from './resetPasswordTokens';

export default interface Service {
  readonly login: loginSignature;
  readonly register: registerSignature;
  readonly forgetPassword: forgetPasswordSignature;
  readonly createResetPasswordToken: CreateResetPasswordTokenSignature;
  readonly getResetPasswordTokenByToken: GetResetPasswordTokenByTokenSignature;
  readonly getUserResetPasswordTokens: GetUserResetPasswordTokensSignature;
  readonly resetPassword: resetPasswordSignature;

  readonly createUser: createUserSignature;
  readonly getUserById: getUserByIdSignature;
  readonly getUserByEmail: getUserByEmailSignature;
  readonly getUsers: getUsersSignature;
  readonly updateUser: updateUserSignature;
  readonly deleteUserById: deleteUserByIdSignature;

  readonly createPost: createPostSignature;
  readonly getPostById: getPostByIdSignature;
  readonly getPosts: getPostsSignature;
  readonly updatePost: updatePostSignature;
  readonly deletePostById: deletePostByIdSignature;

  readonly createComment: createCommentSignature;
  readonly getCommentById: getCommentByIdSignature;
  readonly getComments: getCommentsSignature;
  readonly updateComment: updateCommentSignature;
  readonly deleteCommentById: deleteCommentByIdSignature;

  readonly createRole: createRoleSignature;
  readonly getRoleById: getRoleByIdSignature;
  readonly getRoles: getRolesSignature;
  readonly updateRole: updateRoleSignature;
  readonly deleteRoleById: deleteRoleByIdSignature;
  readonly assignRolePermission: assignRolePermissionSignature;
  readonly revokeRolePermission: revokeRolePermissionSignature;
  // readonly assignUserRole: assignUserRoleSignature;
  // readonly removeUserRole: removeUserRoleSignature;

  readonly createPermission: createPermissionSignature;
  // readonly getPermission: getPermissionSignature;
  // readonly getPermissions: getPermissionsSignature;
  // readonly updatePermission: updatePermissionSignature;
  // readonly deletePermission: deletePermissionSignature;

  // readonly removeRolePermission: removeRolePermissionSignature;
  readonly getUserPermissions: getUserPermissionsSignature;
  readonly createUserPermissions: CreateUserPermissionsSignature;
  readonly clearService: CommonServiceSignature;
  readonly migrate: CommonServiceSignature;
  readonly rollback: CommonServiceSignature;
}