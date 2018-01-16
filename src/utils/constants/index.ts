import {RoleAttributes} from '../../models/interfaces/role';
import {PermissionAttributes} from '../../models/interfaces/permission';

export const DEFAULT_USERS_PAGINATION_LIMIT = 10;
export const DEFAULT_USERS_PAGINATION_OFFSET = 0;

export const API_ROUTE_V1 = '/api/v1';
export const ONE_HOUR = 3600000;
export const TWO_HOURS: number = 7200000;
export const AUTH_HEADER_NAME:string  = 'authorization';
export const AUTH_BODY_FIELD_NAME:string  = 'auth_token';
export const AUTH_PARAM_NAME:string  = 'auth_token';
export const AUTH_SCHEME_NAME:string  = 'Bearer';
export const MAIL_RECOVERY_PASSWORD_SUBJECT:string  = 'Reset Password Link';
export const MAIL_PASSWORD_CHANGED_SUBJECT:string  = 'Password Changed';

export const USER_MODEL_VISIBLE_PROPERTIES = ['id','firstname', 'lastname', 'bio', 'email','password','created_at', 'updated_at'];

export const PERMISSION_GET_USER: string = 'user.show';
export const PERMISSION_GET_USERS: string = 'users.index';
export const PERMISSION_UPDATE_USER: string = 'user.update';
export const PERMISSION_DELETE_USER: string = 'user.delete';
export const PERMISSION_CREATE_USER: string = 'user.create';

export const PERMISSION_GET_ROLE: string = 'role.show';
export const PERMISSION_GET_ROLES: string = 'roles.index';
export const PERMISSION_UPDATE_ROLE: string = 'role.update';
export const PERMISSION_DELETE_ROLE: string = 'role.delete';
export const PERMISSION_CREATE_ROLE: string = 'role.create';


export const DEFAULT_USER_PERMISSIONS: PermissionAttributes[] = [
  //USERS
  //@todo mayby implements /profile to get/update/delete current user, 
  //for now just allow to do it via /users/:user_id but checking 
  //if req.user.id === :user_id
  { 
    name: PERMISSION_GET_USERS,
    label: 'Allows to get all users'
  },
  { 
    name: PERMISSION_GET_USER,
    label: 'allows to get user for a given id'
  },
  { 
    name: PERMISSION_UPDATE_USER,
    label: 'allows to update user for a given id'
  },
  { 
    name: PERMISSION_DELETE_USER,
    label: 'allows to get delete for a given id'
  },

  //POSTS
  { 
    name: 'post.create',
    label: 'Allows to create a new post'
  },
  { 
    name: 'post.show',
    label: 'Allows to get post for a given id'
  },
  { 
    name: 'posts.index',
    label: 'Allows to get all posts'
  },
  { 
    name: 'post.update',
    label: 'Allows to update post for a given id'
  },
  { 
    name: 'post.delete',
    label: 'Soft deletes post by a given id'
  },

   //COMMENTS
   { 
    name: 'comment.create',
    label: 'Allows to create a new comment'
  },
  { 
    name: 'comment.show',
    label: 'Allows to get comment for a given id'
  },
  { 
    name: 'comments.index',
    label: 'Allows to get all comments'
  },
  { 
    name: 'comment.update',
    label: 'Allows to update comment for a given id'
  },
  { 
    name: 'comment.delete',
    label: 'Soft deletes comment by a given id'
  },

];

export const DEFAULT_USER_ROLE: RoleAttributes = {
  name: 'user',
  description: 'default user role',
};