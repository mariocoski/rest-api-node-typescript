import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {PermissionInstance} from '../../../../models/interfaces/permission';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
   
    const role: PermissionInstance | null = await config.models.Permission.findById(id);

    if(role === null) throw new ModelNotFoundError('Permission');

    await config.models.Permission.destroy({
      where: { id }  
    });
  }; 
}