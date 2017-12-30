import {RoleAttributes} from '../../models/interfaces/role';
import {PermissionAttributes} from '../../models/interfaces/permission';
export const API_ROUTE_V1 = '/api/v1';
export const ONE_HOUR = 3600000;
export const TWO_HOURS = 7200000;
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_BODY_FIELD_NAME = 'auth_token';
export const AUTH_PARAM_NAME = 'auth_token';
export const AUTH_SCHEME_NAME = 'Bearer';
export const MAIL_RECOVERY_PASSWORD_SUBJECT = 'Reset Password Link';
export const MAIL_PASSWORD_CHANGED_SUBJECT = 'Password Changed';
export const DEFAULT_USER_PERMISSIONS: PermissionAttributes[] = [
  //USERS
  //@todo mayby implements /profile to get/update/delete current user, 
  //for now just allow to do it via /users/:user_id but checking 
  //if req.user.id === :user_id
  { 
    name: 'users.index',
    label: 'Allows to get all users'
  },
  { 
    name: 'user.show',
    label: 'allows to get user for a given id'
  },
  { 
    name: 'user.update',
    label: 'allows to update user for a given id'
  },
  { 
    name: 'user.delete',
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