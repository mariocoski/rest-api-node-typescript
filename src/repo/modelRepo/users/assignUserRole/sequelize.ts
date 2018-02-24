import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {RoleInstance} from '../../../../models/interfaces/role';
import {UserInstance} from '../../../../models/interfaces/user';
import {ModelNotFoundError} from '../../../../utils/errors';
import { ROLE_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
export default (config: Config) => {
  return async ({user_id, role_id}: Options) => {

    const user: any = await config.models.User.findOne( 
      {
        where: {id : user_id},
        include: [
          { model: config.models.Role, as: 'roles'}
        ]
      });
    
    if(user === null) throw new ModelNotFoundError('User');

    const role: any = await config.models.Role.findById(role_id);

    if(role === null) throw new ModelNotFoundError('Role');
      
    const remainingRolesIds = user.roles.map(
      (role: any) => role.id
    ).filter(
      (roleId: any) => roleId != role_id
    );

    const permissionsToBeAssigned = [...remainingRolesIds, role_id];

    await user.setRoles(permissionsToBeAssigned);
  }; 
}