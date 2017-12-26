import Signature from './Signature';
import Config from '../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../utils/hashPassword';
import {PermissionInstance} from '../../../models/interfaces/permission';
import {RoleInstance} from '../../../models/interfaces/role';
import {UserInstance} from '../../../models/interfaces/user';
import ModelNotFoundError from '../../../utils/errors/ModelNotFoundError';
import * as R from 'ramda';

export default (config: Config) => {
  return async (options: Options) => {
    
    const user: UserInstance | null = await config.models.User.findOne({
      where: {id: options.userId}, include: [
        { model: config.models.Role, as: 'roles', include: [
          {model: config.models.Permission, as: 'permissions'}
        ]}
      ],
    });

    if(user === null) throw new ModelNotFoundError();

    return R.flatten(
      user.roles.map((role: RoleInstance):PermissionInstance[] => role.permissions)
    );
  }; 
}