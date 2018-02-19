import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {RoleInstance} from '../../../../models/interfaces/role';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
   
    const role: RoleInstance | null = await config.models.Role.findOne({
      where: { id }  
    });
    
    if(role === null) throw new ModelNotFoundError('Role');

    await config.models.Role.destroy({
      where: { id }  
    });
  }; 
}