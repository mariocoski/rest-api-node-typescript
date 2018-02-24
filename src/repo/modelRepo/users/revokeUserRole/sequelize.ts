import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {RoleInstance} from '../../../../models/interfaces/role';
import {ModelNotFoundError} from '../../../../utils/errors';
import { ROLE_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
export default (config: Config) => {
  return async ({user_id, role_id}: Options) => {

    const user: any = await config.models.User.findOne({
      where: {id : user_id},
      include: [
        { model: config.models.Role, as: 'roles'}
      ]
    });

    if(user === null) throw new ModelNotFoundError('User');

    const role: RoleInstance | null = await config.models.Role.findById(role_id);
  
    if(role === null) throw new ModelNotFoundError('Role');

    const remainingIds = user.roles
                              .filter((role: any) => role.id != role_id)
                              .map((role: any) => role.id);

    await user.setRoles(remainingIds);
  }; 
}