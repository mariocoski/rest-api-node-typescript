import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {RoleInstance} from '../../../../models/interfaces/role';
import {PermissionInstance} from '../../../../models/interfaces/permission';
import {ModelNotFoundError} from '../../../../utils/errors';
import { ROLE_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
export default (config: Config) => {
  return async ({role_id, permission_id}: Options) => {

    const role: any = await config.models.Role.findOne({
      where: {id : role_id},
      include: [
        { model: config.models.Permission, as: 'permissions'}
      ]
    });

    if(role === null) throw new ModelNotFoundError('Role');

    const permission: PermissionInstance | null = await config.models.Permission.findById(permission_id);
  
    if(permission === null) throw new ModelNotFoundError('Permission');
    
    const remainingPermissionsIds = role.permissions.map(
      (permission: any) => permission.id
    ).filter(
      (permissionId: any) => permissionId != permission_id
    );

    const permissionsToBeAssigned = [...remainingPermissionsIds, permission_id];
    await role.setPermissions(permissionsToBeAssigned);
  }; 
}