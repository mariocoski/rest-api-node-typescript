import {CreateUserSignature, GetUserByIdSignature,GetUserByEmailSignature,  GetUsersSignature, UpdateUserSignature, DeleteUserByIdSignature, AssignUserRoleSignature, RevokeUserRoleSignature} from './modelRepo/users';
import {CreatePostSignature, GetPostByIdSignature, GetPostsSignature, UpdatePostSignature, DeletePostByIdSignature} from './modelRepo/posts';
import {CreateCommentSignature, GetCommentByIdSignature, GetCommentsSignature, UpdateCommentSignature, DeleteCommentByIdSignature} from './modelRepo/comments';
import {CreateRoleSignature, GetRoleByIdSignature, GetRolesSignature, UpdateRoleSignature, DeleteRoleByIdSignature, AssignRolePermissionSignature, RevokeRolePermissionSignature} from './modelRepo/roles';
import {CreateUserPermissionsSignature, GetUserPermissionsSignature, CreatePermissionSignature, GetPermissionByIdSignature, GetPermissionsSignature,
        UpdatePermissionSignature, DeletePermissionByIdSignature} from './modelRepo/permissions';
import {CreateResetPasswordSignature, GetUserResetPasswordTokensSignature, GetResetPasswordTokenByTokenSignature, DeleteResetPasswordTokenByIdSignature} from './modelRepo/resetPasswordTokens';
import SendEmailSignature from './mailRepo/sendEmail/Signature';

export interface ModelRepoInterface {
    readonly createResetPasswordToken: CreateResetPasswordSignature;
    readonly getUserResetPasswordTokens: GetUserResetPasswordTokensSignature;
    readonly getResetPasswordTokenByToken: GetResetPasswordTokenByTokenSignature;
    readonly deleteResetPasswordTokenById: DeleteResetPasswordTokenByIdSignature;

    readonly createUser: CreateUserSignature;
    readonly getUserById: GetUserByIdSignature;
    readonly getUserByEmail: GetUserByEmailSignature;
    readonly getUsers: GetUsersSignature;
    readonly updateUser: UpdateUserSignature;
    readonly deleteUserById: DeleteUserByIdSignature;
    readonly assignUserRole: AssignUserRoleSignature;
    readonly revokeUserRole: RevokeUserRoleSignature;

    readonly createPost: CreatePostSignature;
    readonly getPostById: GetPostByIdSignature;
    readonly getPosts: GetPostsSignature;
    readonly updatePost: UpdatePostSignature;
    readonly deletePostById: DeletePostByIdSignature;

    readonly createComment: CreateCommentSignature;
    readonly getCommentById: GetCommentByIdSignature;
    readonly getComments: GetCommentsSignature;
    readonly updateComment: UpdateCommentSignature;
    readonly deleteCommentById: DeleteCommentByIdSignature;

    readonly createRole: CreateRoleSignature;
    readonly getRoleById: GetRoleByIdSignature;
    readonly getRoles: GetRolesSignature;
    readonly updateRole: UpdateRoleSignature;
    readonly deleteRoleById: DeleteRoleByIdSignature;
    readonly assignRolePermission: AssignRolePermissionSignature;
    readonly revokeRolePermission: RevokeRolePermissionSignature;
   

    readonly createPermission: CreatePermissionSignature;
    readonly getPermissionById: GetPermissionByIdSignature;
    readonly getPermissions: GetPermissionsSignature;
    readonly updatePermission: UpdatePermissionSignature;
    readonly deletePermissionById: DeletePermissionByIdSignature;
    readonly createUserPermissions: CreateUserPermissionsSignature;
    readonly getUserPermissions: GetUserPermissionsSignature;
    readonly clearRepo: () => Promise<void>;
    readonly migrate: () => Promise<void>;
    readonly rollback: () => Promise<void>;
}

export interface MailRepoInterface {
    readonly sendEmail: SendEmailSignature;
}

export default interface Repo extends ModelRepoInterface, MailRepoInterface {}