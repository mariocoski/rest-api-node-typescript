import Signature from './Signature';
import Config from '../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../utils/hashPassword';
import {PermissionAttributes, PermissionInstance} from '../../../models/interfaces/permission';
import {RoleInstance} from '../../../models/interfaces/role';
import {UserInstance} from '../../../models/interfaces/user';
import ModelNotFoundError from '../../../utils/errors/ModelNotFoundError';
import {DEFAULT_USER_ROLE, DEFAULT_USER_PERMISSIONS} from '../../../utils/constants';
import * as R from 'ramda';

export default (config: Config) => {
  return async ({userId, role = DEFAULT_USER_ROLE, permissions = DEFAULT_USER_PERMISSIONS}: Options) => {
    
    const user: any = await config.models.User.findById(userId);

    if(user === null) throw new ModelNotFoundError();

    const userRole: any = await config.models.Role.create(role);
    
    await user.setRoles([userRole]);

    const createdPermissions: PermissionInstance[] = await Promise.all(
      permissions.map(async (permission: PermissionAttributes) => 
        config.models.Permission.create(permission))
    );
    
    await userRole.setPermissions(createdPermissions);
  }; 
}