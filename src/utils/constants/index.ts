import {RoleAttributes} from '../../models/interfaces/role';
import {PermissionAttributes} from '../../models/interfaces/permission';

export const DEFAULT_USERS_PAGINATION_LIMIT = 10;
export const DEFAULT_USERS_PAGINATION_OFFSET = 0;
export const DEFAULT_POSTS_PAGINATION_LIMIT = 10;
export const DEFAULT_POSTS_PAGINATION_OFFSET = 0;
export const DEFAULT_COMMENTS_PAGINATION_LIMIT = 10;
export const DEFAULT_COMMENTS_PAGINATION_OFFSET = 0;
export const DEFAULT_ROLES_PAGINATION_LIMIT = 10;
export const DEFAULT_ROLES_PAGINATION_OFFSET = 0;
export const DEFAULT_PERMISSIONS_PAGINATION_LIMIT = 10;
export const DEFAULT_PERMISSIONS_PAGINATION_OFFSET = 0;

export const DEFAULT_POSTS_ORDER = [['created_at', 'desc']];
export const DEFAULT_ROLES_ORDER = [['created_at', 'desc']];
export const DEFAULT_PERMISSIONS_ORDER = [['created_at', 'desc']];
export const DEFAULT_USERS_ORDER = [['created_at', 'desc']];
export const DEFAULT_COMMENTS_ORDER = [['created_at', 'desc']];
export const API_ROUTE_V1 = '/api/v1';
export const ONE_HOUR = 3600000;
export const TWO_HOURS: number = 7200000;
export const AUTH_HEADER_NAME:string  = 'authorization';
export const AUTH_BODY_FIELD_NAME:string  = 'auth_token';
export const AUTH_PARAM_NAME:string  = 'auth_token';
export const AUTH_SCHEME_NAME:string  = 'Bearer';
export const MAIL_RECOVERY_PASSWORD_SUBJECT:string  = 'Reset Password Link';
export const MAIL_PASSWORD_CHANGED_SUBJECT:string  = 'Password Changed';

export const VARCHAR_FIELD_LENGTH: number = 255;
export const TEXT_FIELD_LENGTH: number = 21844;

export const USER_MODEL_VISIBLE_PROPERTIES = ['id','firstname', 'lastname', 'bio', 'email','password','created_at', 'updated_at'];
export const POST_MODEL_VISIBLE_PROPERTIES = ['id','title', 'body', 'user_id', 'created_at', 'updated_at'];
export const COMMENT_MODEL_VISIBLE_PROPERTIES = ['id', 'body', 'user_id', 'post_id', 'created_at', 'updated_at'];
export const ROLE_MODEL_VISIBLE_PROPERTIES = ['id','name', 'description','created_at', 'updated_at'];

export const CAN_GET_USER: string = 'user.show';
export const CAN_GET_USERS: string = 'users.index';
export const CAN_UPDATE_USER: string = 'user.update';
export const CAN_DELETE_USER: string = 'user.delete';
export const CAN_CREATE_USER: string = 'user.create';

export const CAN_GET_ROLE: string = 'role.show';
export const CAN_GET_ROLES: string = 'roles.index';
export const CAN_UPDATE_ROLE: string = 'role.update';
export const CAN_DELETE_ROLE: string = 'role.delete';
export const CAN_CREATE_ROLE: string = 'role.create';
export const CAN_ASSIGN_ROLE: string = 'role.assign';
export const CAN_REVOKE_ROLE: string = 'role.revoke';

export const CAN_GET_PERMISSION: string = 'permission.show';
export const CAN_GET_PERMISSIONS: string = 'permissions.index';
export const CAN_UPDATE_PERMISSION: string = 'permission.update';
export const CAN_DELETE_PERMISSION: string = 'permission.delete';
export const CAN_CREATE_PERMISSION: string = 'permission.create';
export const CAN_ASSIGN_PERMISSION: string = 'permission.assign';
export const CAN_REVOKE_PERMISSION: string = 'permission.revoke';

export const CAN_GET_POST: string = 'post.show';
export const CAN_GET_POSTS: string = 'posts.index';
export const CAN_UPDATE_POST: string = 'post.update';
export const CAN_DELETE_POST: string = 'post.delete';
export const CAN_CREATE_POST: string = 'post.create';

export const CAN_GET_COMMENT: string = 'comment.show';
export const CAN_GET_COMMENTS: string = 'comments.index';
export const CAN_UPDATE_COMMENT: string = 'comment.update';
export const CAN_DELETE_COMMENT: string = 'comment.delete';
export const CAN_CREATE_COMMENT: string = 'comment.create';

export const CAN_ADMINISTER: string = 'administer';

export const DEFAULT_ADMIN_PERMISSIONS: PermissionAttributes[] = [
  { 
    name: CAN_ADMINISTER,
    label: 'Allows to perform any action'
  },
];

export const DEFAULT_USER_PERMISSIONS: PermissionAttributes[] = [
  //USERS
  //@todo mayby implements /profile to get/update/delete current user, 
  //for now just allow to do it via /users/:user_id but checking 
  //if req.user.id === :user_id
  { 
    name: CAN_GET_USERS,
    label: 'Allows to get all users'
  },
  { 
    name: CAN_GET_USER,
    label: 'allows to get user for a given id'
  },
  { 
    name: CAN_UPDATE_USER,
    label: 'allows to update user for a given id'
  },
  { 
    name: CAN_DELETE_USER,
    label: 'allows to get delete for a given id'
  },

  //POSTS
  { 
    name: CAN_GET_POSTS,
    label: 'Allows to get all posts'
  },
  { 
    name: CAN_GET_POST,
    label: 'Allows to get post for a given id'
  },
  { 
    name: CAN_CREATE_POST,
    label: 'Allows to create a new post'
  },
  { 
    name: CAN_UPDATE_POST,
    label: 'Allows to update post for a given id'
  },
  { 
    name: CAN_DELETE_POST,
    label: 'Soft deletes post by a given id'
  },

   //COMMENTS
  { 
    name: CAN_GET_COMMENTS,
    label: 'Allows to get all comments'
  },
  { 
    name: CAN_GET_COMMENT,
    label: 'Allows to get comment for a given id'
  },
  { 
    name: CAN_CREATE_COMMENT,
    label: 'Allows to create a new comment'
  },
  { 
    name: CAN_UPDATE_COMMENT,
    label: 'Allows to update comment for a given id'
  },
  { 
    name: CAN_DELETE_COMMENT,
    label: 'Soft deletes comment by a given id'
  },

];

export const DEFAULT_USER_ROLE: RoleAttributes = {
  name: 'user',
  description: 'default user role',
};

