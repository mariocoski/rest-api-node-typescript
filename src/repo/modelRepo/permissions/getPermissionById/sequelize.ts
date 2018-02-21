import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import { PERMISSION_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {PermissionInstance} from '../../../../models/interfaces/permission';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
    
    const permission: PermissionInstance | null = await config.models.Permission.findOne({
      attributes: PERMISSION_MODEL_VISIBLE_PROPERTIES,
      where: { id }  
    });

    if(permission === null) throw new ModelNotFoundError('Permission');

    return permission.get({ plain: true });
  }; 
}