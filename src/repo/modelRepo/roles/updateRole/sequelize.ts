import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {RoleInstance} from '../../../../models/interfaces/role';
import {UniqueConstraintError} from 'sequelize';
import {ModelNotFoundError} from '../../../../utils/errors';
import { ROLE_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {ForeignKeyConstraintError} from 'sequelize';
export default (config: Config) => {
  return async ({id, data}: Options) => {
  
      const foundRole: RoleInstance | null = await config.models.Role.findOne({
        attributes: ROLE_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });

      if(foundRole === null) throw new ModelNotFoundError('Role');

      await config.models.Role.update(
        {
          ...data, 
          updated_at: (new Date().toDateString())
        },
        {
          where : {id}
        }
      );
    
      const role: any  = await config.models.Role.findOne({
        attributes: ROLE_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });

      return role.get({plain: true});
    }; 
}