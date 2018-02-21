import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {PermissionInstance} from '../../../../models/interfaces/permission';
import {UniqueConstraintError} from 'sequelize';
import {ModelAlreadyExistsError} from '../../../../utils/errors';
export default (config: Config) => {
  return async (options: Options) => {
    try{
      const permission: PermissionInstance = await config.models.Permission.create({
        name: options.name,
        label: options.label,
        description: options.description
      });
      return permission.get({ plain: true });
    }catch(err){
      if(err instanceof UniqueConstraintError){
        throw new ModelAlreadyExistsError('Permission');
      }
      throw err;
    }
  }; 
}