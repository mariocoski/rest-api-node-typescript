import {CreateUserSignature, GetUserByIdSignature,GetUserByEmailSignature,  GetUsersSignature, UpdateUserSignature, DeleteUserByIdSignature} from './modelRepo/users';
import {CreatePostSignature, GetPostSignature, GetPostsSignature, UpdatePostSignature, DeletePostSignature} from './modelRepo/posts';
import {CreateCommentSignature, GetCommentSignature, GetCommentsSignature, UpdateCommentSignature, DeleteCommentSignature} from './modelRepo/comments';
import {CreateRoleSignature, GetRoleSignature, GetRolesSignature, UpdateRoleSignature, DeleteRoleSignature, AssignUserRoleSignature, RemoveUserRoleSignature} from './modelRepo/roles';
import {CreateUserPermissionsSignature, GetUserPermissionsSignature, CreatePermissionSignature, GetPermissionSignature, GetPermissionsSignature,
        UpdatePermissionSignature, DeletePermissionSignature, AssignRolePermissionSignature, RemoveRolePermissionSignature} from './modelRepo/permissions';
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

    // readonly createPost: CreatePostSignature;
    // readonly getPost: GetPostSignature;
    // readonly getPosts: GetPostsSignature;
    // readonly updatePost: UpdatePostSignature;
    // readonly deletePost: DeletePostSignature;

    // readonly createComment: CreateCommentSignature;
    // readonly getComment: GetCommentSignature;
    // readonly getComments: GetCommentsSignature;
    // readonly updateComment: UpdateCommentSignature;
    // readonly deleteComment: DeleteCommentSignature;

    readonly createRole: CreateRoleSignature;
    // readonly getRole: GetRoleSignature;
    // readonly getRoles: GetRolesSignature;
    // readonly updateRole: UpdateRoleSignature;
    // readonly deleteRole: DeleteRoleSignature;
    // readonly assignUserRole: AssignUserRoleSignature;
    // readonly removeUserRole: RemoveUserRoleSignature;

    readonly createPermission: CreatePermissionSignature;
    // readonly getPermission: GetPermissionSignature;
    // readonly getPermissions: GetPermissionsSignature;
    // readonly updatePermission: UpdatePermissionSignature;
    // readonly deletePermission: DeletePermissionSignature;
    // readonly assignRolePermission: AssignRolePermissionSignature;
    // readonly removeRolePermission: RemoveRolePermissionSignature;
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