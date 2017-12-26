import {CreateUserSignature, GetUserSignature, GetUsersSignature, UpdateUserSignature, DeleteUserSignature} from './users';
import {CreatePostSignature, GetPostSignature, GetPostsSignature, UpdatePostSignature, DeletePostSignature} from './posts';
import {CreateCommentSignature, GetCommentSignature, GetCommentsSignature, UpdateCommentSignature, DeleteCommentSignature} from './comments';
import {CreateRoleSignature, GetRoleSignature, GetRolesSignature, UpdateRoleSignature, DeleteRoleSignature, AssignUserRoleSignature, RemoveUserRoleSignature} from './roles';
import {CreateUserPermissionsSignature, GetUserPermissionsSignature, CreatePermissionSignature, GetPermissionSignature, GetPermissionsSignature, UpdatePermissionSignature, DeletePermissionSignature, AssignRolePermissionSignature, RemoveRolePermissionSignature} from './permissions';

export default interface Repo {
    // readonly login: LoginSignature;
    // readonly register: RegisterSignature;
    // readonly forgetPassword: ForgetPasswordSignature;
    // readonly resetPassword: ResetPasswordSignature;

    readonly createUser: CreateUserSignature;
    readonly getUser: GetUserSignature;
    // readonly getUsers: GetUsersSignature;
    // readonly updateUser: UpdateUserSignature;
    // readonly deleteUser: DeleteUserSignature;

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

    // readonly createRole: CreateRoleSignature;
    // readonly getRole: GetRoleSignature;
    // readonly getRoles: GetRolesSignature;
    // readonly updateRole: UpdateRoleSignature;
    // readonly deleteRole: DeleteRoleSignature;
    // readonly assignUserRole: AssignUserRoleSignature;
    // readonly removeUserRole: RemoveUserRoleSignature;

    // readonly createPermission: CreatePermissionSignature;
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