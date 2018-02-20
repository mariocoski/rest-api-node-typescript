import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import { ROLE_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {RoleInstance} from '../../../../models/interfaces/role';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
    const role: RoleInstance | null = await config.models.Role.findOne({
      attributes: ROLE_MODEL_VISIBLE_PROPERTIES,
      include: [ { model: config.models.Permission, as: 'permissions' } ],
      where: { id }  
    });
  
    if(role === null) throw new ModelNotFoundError('Role');

    return role.get({ plain: true });
  }; 
}